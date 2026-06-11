import esg1 from "@/assets/projects/esg1.webp";
import esg2 from "@/assets/projects/esg2.webp";
import porto1 from "@/assets/projects/porto1.webp";
import porto2 from "@/assets/projects/porto2.webp";
import porto3 from "@/assets/projects/porto3.webp";
import porto4 from "@/assets/projects/porto4.webp";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  image: string;
}

export interface TimelineItemData {
  id: string;
  label: string; // The year range (e.g., "2024 - Pres")
  type: "job" | "education"; // Used to determine which icon to show (Briefcase vs GraduationCap)
  title: string;
  company: string;
  description: string;
  tags: string[];
  testimonials?: Testimonial[];
}

export const timelineData: TimelineItemData[] = [
  {
    id: "senior-frontend",
    label: "2024 - Pres",
    type: "job",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    description: "Memimpin tim frontend developer dalam membangun aplikasi SaaS berkinerja tinggi. Merancang arsitektur sistem desain baru dan memigrasi kode lama ke Vue 3 & Vite untuk peningkatan kecepatan development serta performa rendering.",
    tags: ["Vue 3", "TypeScript", "Pinia", "SaaS Architecture"],
    testimonials: [
      {
        quote: "Membangun sistem desain dari nol yang akhirnya mempercepat proses development seluruh tim hingga 40%.",
        name: "Sistem Desain Vue 3",
        designation: "TechCorp SaaS",
        image: esg1,
      },
      {
        quote: "Implementasi fitur realtime dashboard dengan grafik yang responsif dan sangat mulus.",
        name: "Realtime Analytics",
        designation: "TechCorp SaaS",
        image: esg2,
      }
    ]
  },
  {
    id: "frontend-designer",
    label: "2022 - 2024",
    type: "job",
    title: "Frontend Developer & UI/UX Designer",
    company: "Creative Studio",
    description: "Merancang dan mengembangkan website klien, toko e-commerce, dan platform pemasaran interaktif. Bekerja di titik temu antara desain dan kode untuk menciptakan pengalaman digital yang imersif, cepat, dan responsif.",
    tags: ["Figma", "Vue 3", "GSAP Animations", "UI/UX Design"],
    testimonials: [
      {
        quote: "Eksplorasi antarmuka minimalis dengan transisi halaman yang elegan dan animasi mikro.",
        name: "Nova E-Commerce",
        designation: "Creative Studio",
        image: porto1,
      },
      {
        quote: "Membuat desain sistem dan komponen UI yang dapat digunakan kembali untuk berbagai klien.",
        name: "UI Component Library",
        designation: "Creative Studio",
        image: porto2,
      }
    ]
  },
  {
    id: "college-cs",
    label: "2018 - 2022",
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University of Technology",
    description: "Lulus dengan predikat sangat memuaskan (Honors), mengambil spesialisasi Software Engineering. Memiliki pemahaman kuat dalam sistem komputer, algoritma, manajemen database, dan interaksi manusia-komputer (HCI).",
    tags: ["Algorithms", "Software Engineering", "HCI", "Web Accessibility"],
    testimonials: [
      {
        quote: "Juara 1 Hackathon Nasional dengan proyek aplikasi aksesibilitas untuk penyandang disabilitas.",
        name: "Hackathon Nasional 2021",
        designation: "University of Technology",
        image: porto3,
      },
      {
        quote: "Proyek akhir berupa sistem pakar berbasis AI yang dipublikasikan dalam jurnal kampus.",
        name: "Skripsi & Publikasi",
        designation: "University of Technology",
        image: porto4,
      }
    ]
  }
];
