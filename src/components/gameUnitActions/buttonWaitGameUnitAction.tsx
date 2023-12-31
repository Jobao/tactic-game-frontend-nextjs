"use client";

import { useParams } from "next/navigation";
import { Button } from "flowbite-react";

export default function ButtonWaitGameUnitAction() {
  const params = useParams();

  return <Button>WAIT</Button>;
}
