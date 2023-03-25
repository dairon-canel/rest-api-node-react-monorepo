import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import PeripheralModel, {
  PeripheralDocument,
  PeripheralInput,
} from '../models/peripheral.model';

export async function createPeripheral(input: PeripheralInput) {
  return PeripheralModel.create(input);
}

export async function findPeripheral(
  query: FilterQuery<PeripheralDocument>,
  options: QueryOptions = { lean: true },
) {
  return PeripheralModel.findOne(query, {}, options);
}

export async function queryPeripheral(
  query: FilterQuery<PeripheralDocument>,
  options: QueryOptions = { lean: true },
) {
  return PeripheralModel.find(query, {}, options);
}

export async function findAndUpdatePeripheral(
  query: FilterQuery<PeripheralDocument>,
  update: UpdateQuery<PeripheralDocument>,
  options: QueryOptions,
) {
  return PeripheralModel.findOneAndUpdate(query, update, options);
}

export async function deletePeripheral(query: FilterQuery<PeripheralDocument>) {
  return PeripheralModel.deleteOne(query);
}
