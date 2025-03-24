import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';
import { Logger } from './logger';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = new this.todoModel(todo);
    await newTodo.save();
    Logger.info('Task created', { todo: newTodo });
    return newTodo;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.todoModel.find().exec();
    Logger.info('Fetched all tasks');
    return todos;
  }

  async update(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todo, { new: true });
    if (!updatedTodo) {
      Logger.warn('Task not found for update', { id });
      return null;
    }
    Logger.info('Task updated', { id, todo: updatedTodo });
    return updatedTodo;
  }

  async delete(id: string): Promise<Todo | null> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      Logger.warn('Task not found for deletion', { id });
      return null;
    }
    Logger.info('Task deleted', { id });
    return deletedTodo;
  }
}
