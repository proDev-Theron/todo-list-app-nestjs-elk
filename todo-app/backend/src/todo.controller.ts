import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: Partial<Todo>) {
    return this.todoService.create(todo);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: Partial<Todo>) {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
