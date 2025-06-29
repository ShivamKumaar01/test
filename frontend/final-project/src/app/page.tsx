import Image from "next/image";
import styles from "./page.module.css";
import Signup from "@/components/signup";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box >
      <Signup></Signup>
    </Box>
  );
}
