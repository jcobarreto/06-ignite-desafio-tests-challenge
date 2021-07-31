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
