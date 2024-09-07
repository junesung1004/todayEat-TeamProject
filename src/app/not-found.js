import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <>
      <div>잘못된 경로입니다.</div>
      <Link href={"/"}>홈으로</Link>
    </>
  );
}
