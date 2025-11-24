import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Transaction from "@/server/src/models/Transaction";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('Session:', session); // Debug log

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  console.log('Received body:', body); // Debug log
  
  const { symbol, qty, price } = body;
  const side = body.side?.toLowerCase(); // Convert to lowercase
  
  console.log('Parsed values:', { symbol, side, qty, price }); // Debug log
  console.log('Type checks:', {
    symbolType: typeof symbol,
    sideType: typeof side,
    qtyType: typeof qty,
    priceType: typeof price
  }); // Debug log
  console.log('Validation checks:', {
    hasSymbol: !!symbol,
    validSide: ["buy", "sell"].includes(side),
    qtyGreaterThanZero: qty > 0,
    priceGreaterOrEqualZero: price >= 0
  }); // Debug log

  if (!symbol || !["buy", "sell"].includes(side) || !(qty > 0) || !(price >= 0)) {
    console.log('Validation FAILED'); // Debug log
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  console.log('Validation PASSED, creating transaction...'); // Debug log

  const newTx = await Transaction.create({
    userId: session.user.id,
    symbol,
    side,
    qty,
    price,
  });

  console.log('Transaction created:', newTx); // Debug log

  return NextResponse.json(newTx, { status: 201 });
}

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('GET - Session:', session); // Debug log

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log('Fetching transactions for user:', session.user.id); // Debug log

  const items = await Transaction.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(20);

  console.log('Found transactions:', items.length); // Debug log

  return NextResponse.json(items);
}