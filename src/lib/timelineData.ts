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
    id: "kazee-fullstack",
    label: "Desember 2025 - Juni 2026",
    type: "job",
    title: "Full Stack Developer",
    company: "Kazee Digital Indonesia",
    description: "Mengembangkan dan memelihara aplikasi web berskala enterprise menggunakan kombinasi framework Vue.js (Front-End) dan NestJS (Back-End). Berhasil menyelesaikan dan menerapkan 2 modul utama selama masa internship, yaitu modul Shareform dan modul Generate Final Report. Merancang serta mengintegrasikan RESTful API yang efisien menggunakan NestJS untuk mendukung fungsionalitas pengolahan data yang dinamis. Membangun antarmuka pengguna (UI) yang responsif, interaktif, dan mudah digunakan (user-friendly) dengan Vue.js. Berkolaborasi aktif dengan tim internal untuk memastikan kualitas kode, optimasi performa aplikasi, dan ketepatan waktu rilis modul.",
    tags: ["Vue.js", "NestJS", "RESTful API", "Full Stack"],
    testimonials: [
      {
        quote: "Membangun antarmuka yang sangat baik dan menyelesaikannya tepat waktu.",
        name: "Proyek Modul Shareform",
        designation: "Kazee Digital Indonesia",
        image: esg1,
      },
      {
        quote: "Mempercepat proses pengolahan data dengan RESTful API yang handal.",
        name: "Modul Generate Final Report",
        designation: "Kazee Digital Indonesia",
        image: esg2,
      }
    ]
  },
  {
    id: "sindigi-pm",
    label: "September 2024 - Januari 2025",
    type: "job",
    title: "Internship Project Manager",
    company: "PT Sindigilive Teknologi Kreatif",
    description: "Mengembangkan situs web O–Seek (Orphanage Seeker), sebuah platform untuk mencari panti asuhan di sekitar Bandung. Mengelola alur kerja proyek, mengembangkan dan memelihara linimasa proyek, serta melacak kemajuan dan mengatasi potensi keterlambatan. Menerapkan metodologi Scrum untuk pengembangan proyek, termasuk mengadakan daily stand-ups dan perencanaan sprint. Berkolaborasi dengan tim lintas fungsi, termasuk developer, desainer, dan pemangku kepentingan untuk memastikan kelancaran pelaksanaan proyek. Membuat dan mengelola dokumentasi proyek yang penting, termasuk Business Requirement Documents (BRD), Software Requirements Specification (SRS), dan laporan lainnya.",
    tags: ["Project Management", "Scrum", "BRD", "SRS"],
    testimonials: [
      {
        quote: "Platform O-Seek berjalan sesuai timeline berkat manajemen proyek yang solid.",
        name: "Proyek O-Seek",
        designation: "PT Sindigilive",
        image: porto1,
      },
      {
        quote: "Dokumentasi yang rapi sangat membantu kelancaran tim pengembang.",
        name: "Dokumentasi & SRS",
        designation: "PT Sindigilive",
        image: porto2,
      }
    ]
  },
  {
    id: "esdm-dataentry",
    label: "Agustus 2024 - Desember 2024",
    type: "job",
    title: "Data Entry Operator",
    company: "Kementerian Energi dan Sumber Daya Mineral",
    description: "Memproses data untuk memastikan akurasi dan kelengkapan sebelum diinput. Memasukkan data yang telah diproses ke dalam Microsoft Excel dengan format yang sesuai dan terstruktur query sistem dan kondisi yang telah ditentukan. Memproses dan mengunggah dokumen yang relevan berdasarkan data yang dimasukkan, serta memverifikasi kesesuaian dengan persyaratan yang berlaku. Memantau data baru yang diterima dari operator lapangan dan segera memproses serta memvalidasinya untuk memastikan kelengkapan dan akurasi.",
    tags: ["Data Entry", "Microsoft Excel", "Data Validation", "Data Management"],
    testimonials: [
      {
        quote: "Proses entry data dan validasi yang sangat akurat.",
        name: "Input Data Lapangan",
        designation: "Kementerian ESDM",
        image: porto3,
      },
      {
        quote: "Pemrosesan dokumen dilakukan dengan rapi sesuai standar query.",
        name: "Validasi Dokumen",
        designation: "Kementerian ESDM",
        image: porto4,
      }
    ]
  },
  {
    id: "sindigi-flutter",
    label: "Februari 2024 - Juli 2024",
    type: "job",
    title: "Internship Mobile Developer - Flutter",
    company: "PT Sindigilive Teknologi Kreatif",
    description: "Developing mobile (Bumi Desa E-Commerce BUMDES) untuk transaksi produk antara distributor dan pengguna di beberapa kabupaten di Tasikmalaya. Membuat desain UI yang responsif agar aplikasi dapat digunakan di berbagai perangkat dengan tata letak yang otomatis menyesuaikan untuk pengalaman pengguna yang baik. Mengintegrasikan Restful API di Flutter untuk mengambil data secara dinamis dan meningkatkan nilai guna aplikasi. Membuat animasi antarmuka untuk meningkatkan daya tarik visual aplikasi.",
    tags: ["Flutter", "Mobile Development", "RESTful API", "UI Design"],
    testimonials: [
      {
        quote: "Aplikasi e-commerce berhasil diimplementasikan dengan responsif.",
        name: "Bumdes E-Commerce",
        designation: "PT Sindigilive",
        image: esg1,
      },
      {
        quote: "Pengalaman pengguna lebih menarik berkat animasi antarmuka yang baik.",
        name: "UI/UX & Animasi",
        designation: "PT Sindigilive",
        image: porto1,
      }
    ]
  }
];
