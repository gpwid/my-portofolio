
import simbaProject from '../assets/simba1.png';

export interface Project {
    title: string;
    desc: string;
    tags: string[];
    status: string;
    img: string;
    link: string;
}

export const projects: Project[] = [
    {
        title: "SIMBA (Internship Management System)",
        desc: "An information system designed to facilitate internship management at UPA TIK, University of Riau.",
        tags: ["Laravel", "PHP", "MySQL"],
        status: "FINISHED",
        img: simbaProject,
        link: "https://github.com/gpwid/proyek-manajemen-magang-upa-tik"
    },
    // Mock projects for testing search/filter
    {
        title: "Neon City (Game Prototype)",
        desc: "A cyberpunk-themed platformer game built with Unity.",
        tags: ["Unity", "C#", "Game Dev"],
        status: "PROTOTYPE",
        img: "https://placehold.co/600x400/101010/DC2626?text=Neon+City",
        link: "#"
    },
    {
        title: "Portfolio v1",
        desc: "The first iteration of my personal portfolio website.",
        tags: ["React", "Tailwind CSS"],
        status: "ARCHIVED",
        img: "https://placehold.co/600x400/050505/333333?text=V1",
        link: "#"
    },
    {
        title: "Network Monitor Script",
        desc: "Python script for monitoring local network traffic anomalies.",
        tags: ["Python", "Networking", "Linux"],
        status: "FINISHED",
        img: "https://placehold.co/600x400/000000/00FF00?text=NetMon",
        link: "#"
    }
];
