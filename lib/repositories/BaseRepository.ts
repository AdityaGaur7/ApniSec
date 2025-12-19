import mongoose, { Model, Document, UpdateQuery } from 'mongoose';

export interface IRead<T> {
    find(item: any): Promise<T[]>;
    findOne(item: any): Promise<T | null>;
}

export interface IWrite<T> {
    create(item: Partial<T>): Promise<T>;
    update(id: string, item: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {
    private _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    async create(item: Partial<T>): Promise<T> {
        const createdItem = new this._model(item);
        return createdItem.save();
    }

    async find(query: any = {}): Promise<T[]> {
        return this._model.find(query).exec();
    }

    async findOne(query: any): Promise<T | null> {
        return this._model.findOne(query).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this._model.findById(id).exec();
    }

    async update(id: string, item: UpdateQuery<T>): Promise<T | null> {
        return this._model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id).exec();
        return !!result;
    }
}
