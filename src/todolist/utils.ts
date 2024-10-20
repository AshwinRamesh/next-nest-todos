import { Todolist } from '../entities/Todolist';
import { TodolistItem } from '../entities/TodoItem';
import { ItemDTO, TodolistDTO } from './dto/TodolistDTO';

export function mapTodolistFromEntity(
  todolist: Todolist,
  items?: TodolistItem[],
): TodolistDTO {
  let itemsList: ItemDTO[] | null = null;
  if (items) {
    itemsList = items.map((item) => mapItemFromEntity(item));
  }
  const dto = new TodolistDTO(
    todolist.id,
    todolist.creator.id,
    todolist.name,
    todolist.details,
    todolist.isCompleted,
    itemsList,
  );

  return dto;
}

export function mapItemFromEntity(item: TodolistItem): ItemDTO {
  return new ItemDTO(
    item.id,
    item.name,
    item.creator.id,
    item.details,
    item.isCompleted,
    item.todolist.id,
  );
}
