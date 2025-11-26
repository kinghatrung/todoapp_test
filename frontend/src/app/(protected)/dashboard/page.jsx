"use client";

import { ChevronDown, ChevronUp, Equal, Calendar as CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { Popover, PopoverContent, PopoverTrigger } from "~/styles/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/styles/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "~/styles/components/ui/label";
import { Input } from "~/styles/components/ui/input";
import { Calendar } from "~/styles/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/styles/components/ui/dialog";
import { Button } from "~/styles/components/ui/button";
import { currentUserSelect, signOut } from "~/redux/features/authSlice";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "~/styles/components/ui/card";
import Task from "~/components/Task";
import taskService from "~/services/taskService";

const taskSchema = z.object({
  title: z.string().nonempty("Tên công việc bắt buộc phải có"),
  description: z.string().nonempty("Mô tả công việc bắt buộc phải có"),
  status: z.string().nonempty("Trạng thái công việc bắt buộc phải có"),
  priority: z.string().nonempty("Trạng thái công việc bắt buộc phải có"),
  deadline: z.date("Hạn công việc không được để trống"),
});

function DashBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useSelector(currentUserSelect);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date());
  const [openChange, setOpenChange] = useState(false);

  const { data: tasksData } = useQuery({
    queryKey: ["tasks", statusFilter, priorityFilter, search],
    queryFn: async () => await taskService.getTask({ status: statusFilter, priority: priorityFilter, search }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      deadline: new Date(),
    },
  });

  const tasks = tasksData?.tasks.tasks || [];

  const handleSignOut = async () => {
    await dispatch(signOut()).unwrap();
    router.push("/signin");
  };

  const handleCreateTask = async (data) => {
    const { deadline, description, priority, status, title } = data;
    const idUser = user?.user._id;
    await taskService.createTask(title, description, status, priority, deadline, idUser);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    reset();
    setDate(undefined);
    setOpenChange(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-[800px] border-2 shadow-lg p-6">
        <CardHeader className="p-0">
          <CardTitle className="font-bold text-3xl">Xin chào, {user?.user?.displayName}!</CardTitle>
          <CardDescription className="text-lg">
            Hãy bắt đầu quản lý công việc và hoàn thành mục tiêu hôm nay nào!
          </CardDescription>
          <CardAction>
            <Dialog open={openChange} onOpenChange={setOpenChange}>
              <DialogTrigger asChild>
                <Button className="h-10 cursor-pointer">
                  <Plus />
                  Thêm công việc
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-bold text-xl">Tạo công việc mới</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleCreateTask)}>
                  <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="block text-sm">
                        Tên công việc
                      </Label>
                      <Input id="title" type="text" placeholder="Quét nhà..." {...register("title")} />
                      {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="flex gap-3">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="status" className="block text-sm">
                          Trạng thái
                        </Label>
                        <Select defaultValue="" onValueChange={(value) => setValue("status", value)}>
                          <SelectTrigger
                            id="status"
                            className="w-full border border-gray-300 transition-all duration-300 cursor-pointer"
                          >
                            <SelectValue placeholder="Trạng thái công việc..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Trạng thái</SelectLabel>
                              <SelectItem className="cursor-pointer h-10" value="todo">
                                Chưa làm
                              </SelectItem>
                              <SelectItem className="cursor-pointer h-10" value="inprogress">
                                Đang làm
                              </SelectItem>
                              <SelectItem className="cursor-pointer h-10" value="done">
                                Hoàn thành
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.status && <p className="text-destructive text-sm">{errors.status.message}</p>}
                      </div>

                      <div className="space-y-2 w-full">
                        <Label htmlFor="priority" className="block text-sm">
                          Độ ưu tiên
                        </Label>
                        <Select
                          defaultValue=""
                          onValueChange={(value) => setValue("priority", value, { shouldValidate: true })}
                        >
                          <SelectTrigger
                            id="priority"
                            className="w-full border border-gray-300 transition-all duration-300 cursor-pointer"
                          >
                            <SelectValue placeholder="Độ ưu tiên công việc..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Độ ưu tiên</SelectLabel>
                              <SelectItem className="cursor-pointer h-10" value="low">
                                <ChevronDown className="w-full h-full" />
                                Thấp
                              </SelectItem>
                              <SelectItem className="cursor-pointer h-10" value="medium">
                                <Equal className="w-full h-full " />
                                Trung bình
                              </SelectItem>
                              <SelectItem className="cursor-pointer h-10" value="high">
                                <ChevronUp className="w-full h-full" />
                                Cao
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.priority && <p className="text-destructive text-sm">{errors.priority.message}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="space-y-2 w-full">
                        <Label htmlFor="deadline" className="block text-sm">
                          Hạn công việc
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="deadline"
                              className="w-full justify-start text-left font-normal cursor-pointer"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                if (!date) return;
                                setValue("deadline", date, { shouldValidate: true });
                                setDate(date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.deadline && <p className="text-destructive text-sm">{errors.deadline.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="block text-sm">
                        Mô tả
                      </Label>
                      <Input
                        id="description"
                        type="text"
                        placeholder="Quét nhà như thế nào?..."
                        {...register("description")}
                      />
                      {errors.description && <p className="text-destructive text-sm"> {errors.description.message}</p>}
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button
                        className="cursor-pointer"
                        type="button"
                        variant="outline"
                        onClick={() => setOpenChange(false)}
                      >
                        Hủy
                      </Button>

                      <Button type="submit" className="cursor-pointer text-white">
                        Tạo Task
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <Input
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm công việc..."
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Lọc trạng thái..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trạng thái</SelectLabel>
                  <SelectItem className="cursor-pointer" value="all">
                    Tất cả
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="todo">
                    Chưa làm
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="inprogress">
                    Đang làm
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="done">
                    Đã làm xong
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Lọc độ ưu tiên..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Độ ưu tiên</SelectLabel>
                  <SelectItem className="cursor-pointer" value="all">
                    Tất cả
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="low">
                    Thấp
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="medium">
                    Trung bình
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="high">
                    Cao
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 overflow-y-scroll h-150">
            {tasks?.length > 0 ? tasks?.map((task) => <Task key={task._id} task={task} />) : "Không có dữ liệu nào"}
          </div>
        </div>
        <CardFooter className="p-0">
          <Button className="cursor-pointer" onClick={handleSignOut}>
            Đăng xuất
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DashBoard;
