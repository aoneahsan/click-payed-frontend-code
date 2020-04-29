export interface DepositRequestModel {
    id: number,
    date_time: string,
    account_name: string,
    account_no: string,
    amount: string,
    status: string,
    trx_id: number
    user_id?,
}