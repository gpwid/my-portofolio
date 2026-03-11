
import simbaProject from '../assets/simba1.png';
import portofolioProject from '../assets/portofolio.png'
import twiappProject from '../assets/twiapp.png'

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
        title: "TwiApp",
        desc: "TwiApp is a simple, no-nonsense Android app for downloading media from your favorite social platforms directly to your phone's gallery.",
        tags: ["Kotlin", "Android App"],
        status: "FINISHED",
        img: twiappProject,
        link: "https://github.com/gpwid/twiapp"
    },
    {
        title: "Portfolio Site",
        desc: "The first iteration of my personal portfolio website.",
        tags: ["React", "Tailwind CSS"],
        status: "FINISHED",
        img: portofolioProject,
        link: "https://github.com/gpwid/my-portofolio"
    },
];
