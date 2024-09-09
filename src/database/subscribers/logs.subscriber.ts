import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from "typeorm";
import { User, Logs } from "../entities";


@EventSubscriber()
export class LogsSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async afterInsert(event: InsertEvent<User>) {
        if (!event.entity) {
            event.entity = await event.manager.findOne(User, { where: {id: event.entity.id} });
            return;
        }

        const logs = new Logs();
        logs.user_id = event.entity.id;
        logs.method = 'save'
        logs.oldValues = null; // No old values for insert
        logs.newValues = event.entity;

        await event.manager.save(Logs, logs);
    }

    async afterUpdate(event: UpdateEvent<User>) {
        if (!event.databaseEntity) {
            event.databaseEntity = await event.manager.findOne(User, { where: {id: event.entity.id} });
        }

        const logs = new Logs();
        logs.user_id = event.databaseEntity.id;
        logs.method = 'update'
        logs.oldValues = event.databaseEntity;
        logs.newValues = event.entity;

        await event.manager.save(Logs, logs);
    }

    async beforeRemove(event: RemoveEvent<User>) {        
        if (!event.databaseEntity) {
            event.databaseEntity = await event.manager.findOne(User, { where: {id: event.entity.id} });
        }

        const logs = new Logs();

        logs.user_id = event.entity.id;
        logs.method = 'delete';
        logs.oldValues = event.entity;
        logs.newValues = null; // No new values for delete

        await event.manager.save(Logs, logs);
    }
}