// export interface ICreateTransferDTO {
//   sender_id: string,
//   receiver_id: string,
//   type: string,
//   description: string;
//   amount: number;
// }

import { Transfer } from "../../entities/Transfer";

export type ICreateTransferDTO =
Pick<
  Transfer,
  'sender_id' |
  'receiver_id' |
  'type' |
  'description' |
  'amount'
>
