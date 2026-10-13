import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SERVER_IP } from "@/constants/server_ip";

export interface Cours {
    id: number
    titre: string
    miniature: string
    video: string
    resume: string
}

export const staticUrl = (folder: "images" | "videos", file: string) =>
    `http://${SERVER_IP}:8000/static/${folder}/${file}`

export const getAllCourse = () =>
    axios.get<Cours[]>(`http://${SERVER_IP}:8000/Cours/`).then(response => response.data)

export const useCourses = () =>
    useQuery({ queryKey: ["epargne_cours"], queryFn: getAllCourse })
