import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import GatewayModel, {
  GatewayDocument,
  GatewayInput,
} from '../models/gateway.model';

export async function createGateway(input: GatewayInput) {
  return GatewayModel.create(input);
}

export async function findGateway(
  query: FilterQuery<GatewayDocument>,
  options: QueryOptions = { lean: true },
) {
  return GatewayModel.findOne(query, {}, options);
}

export async function findAndUpdateGateway(
  query: FilterQuery<GatewayDocument>,
  update: UpdateQuery<GatewayDocument>,
  options: QueryOptions,
) {
  return GatewayModel.findOneAndUpdate(query, update, options);
}

export async function deleteGateway(query: FilterQuery<GatewayDocument>) {
  return GatewayModel.deleteOne(query);
}
