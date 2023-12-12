interface UserWithTotalOutboundTransfer {
  id: string;
  email: string;
  name: string | null;
  balance: number;
  totalOutboundTransfer: {
    amount: number | null;
  } | null;
}
