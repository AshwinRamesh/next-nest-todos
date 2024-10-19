import { EntityManager } from '@mikro-orm/core';
import { SharedList } from '../entities/SharedList';
import { Todolist } from '../entities/Todolist';
import { User } from '../entities/User';
import { DbError } from '../common/DbUtils';

export class SharingRepository {
  constructor(private readonly em: EntityManager) {}

  async share(todolistId: number, userId: number) {
    let share = await this.maybeGetShared(todolistId, userId);
    if (share) {
      share.active = true;
    } else {
      share = new SharedList();
      share.todolist = this.em.getReference(Todolist, todolistId);
      share.shared_to = this.em.getReference(User, userId);
    }
    await this.em.persist(share).flush();
    // TODO - should I return anything?
  }

  async unshare(todolistId: number, userId: number) {
    const share = await this.maybeGetShared(todolistId, userId);
    if (!share) {
      throw new DbError(
        `Todolist ${todolistId} is not currently shared with User ${userId}`,
      );
    }
    share.active = false;
    await this.em.persist(share).flush();
    return true;
  }

  async isShared(todolistId: number, userId: number) {
    const share = await this.maybeGetShared(todolistId, userId);
    if (share) {
      return share.active;
    }
    return false;
  }

  async getAllShared(userId: number) {
    const sharedLists = await this.em.findAll(SharedList, {
      fields: ['todolist'],
      populate: [],
      where: {
        shared_to: { $eq: this.em.getReference(User, userId) },
      },
    });
    return sharedLists;
  }

  private async maybeGetShared(
    todolistId: number,
    userId: number,
  ): Promise<SharedList | null> {
    return await this.em.findOne(SharedList, {
      $and: [
        { todolist: { $eq: this.em.getReference(Todolist, todolistId) } },
        { shared_to: { $eq: this.em.getReference(User, userId) } },
      ],
    });
  }
}
