"use client";

import { useState, useEffect } from "react";
import { Trash2, Settings, ChevronDown, ChevronUp, Equal, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Calendar } from "~/styles/components/ui/calendar";
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
import { Label } from "~/styles/components/ui/label";
import { Input } from "~/styles/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/styles/components/ui/dialog";
import { Badge } from "~/styles/components/ui/badge";
import { Button } from "~/styles/components/ui/button";
import taskService from "~/services/taskService";

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
  deadline: z.date(),
});

function Task({ task }) {
  const queryClient = useQueryClient();

  const [openChangeEdit, setOpenChangeEdit] = useState(false);
  const [openChangeDelete, setOpenChangeDelete] = useState(false);

  const { register, handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      deadline: new Date(),
    },
  });

  useEffect(() => {
    if (openChangeEdit) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: new Date(task.deadline),
      });
    }
  }, [openChangeEdit, reset, task]);

  const deadline = watch("deadline");

  const handleDeleteTask = async (idTask) => {
    await taskService.deleteTask(idTask);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const handleEditTask = async (payload) => {
    const { title, description, status, priority, deadline } = payload;

    await taskService.editTask(title, description, status, priority, deadline, task._id);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    setOpenChangeEdit(false);
  };

  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-foreground">{task.title}</h1>
          <p className="mt-1 text-base text-muted-foreground">{task.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={openChangeEdit} onOpenChange={setOpenChangeEdit}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" variant="ghost">
                <Settings />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold text-xl">Chỉnh sửa thông tin công việc</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(handleEditTask)}>
                <div className="flex flex-col gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="block text-sm">
                      Tên công việc
                    </Label>
                    <Input id="title" type="text" placeholder="Quét nhà..." {...register("title")} />
                  </div>

                  <div className="flex gap-3">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="status" className="block text-sm">
                        Trạng thái
                      </Label>
                      <Select defaultValue={task.status} onValueChange={(value) => setValue("status", value)}>
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
                    </div>

                    <div className="space-y-2 w-full">
                      <Label htmlFor="priority" className="block text-sm">
                        Độ ưu tiên
                      </Label>
                      <Select
                        defaultValue={task.priority}
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
                            {deadline ? format(deadline, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={deadline}
                            captionLayout="dropdown"
                            onSelect={(date) => date && setValue("deadline", date)}
                          />
                        </PopoverContent>
                      </Popover>
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
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      className="cursor-pointer"
                      type="button"
                      variant="outline"
                      onClick={() => setOpenChangeEdit(false)}
                    >
                      Hủy
                    </Button>

                    <Button type="submit" className="cursor-pointer text-white">
                      Lưu thay đổi
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog onOpenChange={setOpenChangeDelete} open={openChangeDelete}>
            <DialogTrigger asChild>
              <Button
                className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
                variant="ghost"
              >
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold text-xl">Bạn muốn xóa công việc này?</DialogTitle>
                <DialogDescription>
                  Việc thực hiện xóa công việc sẽ vĩnh viễn không thể khôi phục công việc này nữa. Bạn có chắc chắn vẫn
                  muốn xóa?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpenChangeDelete(false)} className="cursor-pointer" variant="outline">
                  Hủy
                </Button>
                <Button onClick={() => handleDeleteTask(task._id)} className="cursor-pointer">
                  Xóa công việc
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge
          className="inline-block rounded-full px-2.5 py-1 text-sm font-medium border"
          variant={task.status === "todo" ? "todo" : task.status === "inprogress" ? "inprogress" : "done"}
        >
          {task.status === "todo" ? "Chưa làm" : task.status === "inprogress" ? "Đang làm" : "Hoàn thành"}
        </Badge>
        <Badge variant="secondary" className={`flex items-center gap-2 rounded-full px-2.5 py-1 text-sm font-medium`}>
          {task.priority === "low" ? (
            <div className="w-4 h-4">
              <ChevronDown className="w-full h-full" />
            </div>
          ) : task.priority === "high" ? (
            <div className="w-4 h-4">
              <ChevronUp className="w-full h-full" />
            </div>
          ) : (
            <div className="w-4 h-4">
              <Equal className="w-full h-full " />
            </div>
          )}
          {task.priority === "low" ? "Thấp" : task.priority === "medium" ? "Trung bình" : "Cao"}
        </Badge>
        <span className="text-sm text-muted-foreground">Hạn: {format(new Date(task.deadline), "dd/MM/yyyy")}</span>
        <span className="text-sm text-muted-foreground">Người tạo: {task.createdBy.displayName}</span>
      </div>
    </div>
  );
}

export default Task;
