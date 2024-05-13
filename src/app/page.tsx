import { AppRoutes } from "@/types/types";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={AppRoutes.home}>
      <Typography>
        Home
      </Typography>
    </Link>
  );
}
