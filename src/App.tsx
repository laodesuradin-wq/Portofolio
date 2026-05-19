import { Mail, Linkedin, Github, ExternalLink, Award } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen scroll-smooth">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">Halo.</span>
          <div className="space-x-6">
            <a href="#tentang" className="hover:text-indigo-600 font-medium transition">Tentang</a>
            <a href="#projek" className="hover:text-indigo-600 font-medium transition">Projek</a>
            <a href="#sertifikat" className="hover:text-indigo-600 font-medium transition">Sertifikat</a>
            <a href="#kontak" className="hover:text-indigo-600 font-medium transition">Kontak</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="tentang" className="pt-32 pb-20 bg-gradient-to-tr from-indigo-50 to-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Hai, Saya <span className="text-indigo-600">[Nama Anda]</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Seorang [Profesi Anda, misal: Web Developer / Designer] yang fokus membangun solusi digital yang estetik dan fungsional.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#projek" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 font-medium transition">
              Lihat Karya
            </a>
            <a href="#kontak" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 font-medium transition">
              Hubungi Saya
            </a>
          </div>
        </div>
      </section>

      {/* PROJEK SECTION */}
      <section id="projek" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-950">Projek Pilihan</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Kartu Projek 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
            <div className="h-48 bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold group-hover:scale-105 transition-transform duration-300">
              [ Gambar Projek 1 ]
            </div>
            <div className="p-6 relative bg-white">
              <h3 className="text-xl font-bold mb-2">Nama Projek Pertama</h3>
              <p className="text-gray-600 text-sm mb-4">
                Penjelasan singkat tentang masalah yang Anda selesaikan dan teknologi/alat yang digunakan.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline text-sm inline-flex items-center gap-1">
                Lihat Detail <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kartu Projek 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
            <div className="h-48 bg-purple-200 flex items-center justify-center text-purple-700 font-bold group-hover:scale-105 transition-transform duration-300">
              [ Gambar Projek 2 ]
            </div>
            <div className="p-6 relative bg-white">
              <h3 className="text-xl font-bold mb-2">Nama Projek Kedua</h3>
              <p className="text-gray-600 text-sm mb-4">
                Penjelasan singkat tentang masalah yang Anda selesaikan dan teknologi/alat yang digunakan.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline text-sm inline-flex items-center gap-1">
                Lihat Detail <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kartu Projek 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
            <div className="h-48 bg-pink-200 flex items-center justify-center text-pink-700 font-bold group-hover:scale-105 transition-transform duration-300">
              [ Gambar Projek 3 ]
            </div>
            <div className="p-6 relative bg-white">
              <h3 className="text-xl font-bold mb-2">Nama Projek Ketiga</h3>
              <p className="text-gray-600 text-sm mb-4">
                Penjelasan singkat tentang masalah yang Anda selesaikan dan teknologi/alat yang digunakan.
              </p>
              <a href="#" className="text-indigo-600 font-semibold hover:underline text-sm inline-flex items-center gap-1">
                Lihat Detail <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERTIFIKAT SECTION */}
      <section id="sertifikat" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-950">Sertifikat Pelatihan</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sertifikat 1 */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition flex items-start gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-900">Bootcamp Web Development</h3>
              <p className="text-sm text-indigo-600 font-medium mb-1">Penyelenggara A</p>
              <p className="text-sm text-gray-500 mb-3">2024</p>
              <p className="text-sm text-gray-600 hover:text-gray-800 transition">Pelatihan intensif pengembangan frontend dan backend menggunakan teknologi terkini.</p>
            </div>
          </div>

          {/* Sertifikat 2 */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-900">UI/UX Design Masterclass</h3>
              <p className="text-sm text-purple-600 font-medium mb-1">Penyelenggara B</p>
              <p className="text-sm text-gray-500 mb-3">2025</p>
              <p className="text-sm text-gray-600 hover:text-gray-800 transition">Pemahaman mendalam mengenai riset pengguna, wireframing, prototipe, dan usability testing.</p>
            </div>
          </div>

          {/* Sertifikat 3 */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition flex items-start gap-4">
            <div className="bg-pink-100 p-3 rounded-lg text-pink-600 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-900">Sertifikasi Cloud Practitioner</h3>
              <p className="text-sm text-pink-600 font-medium mb-1">Penyelenggara C</p>
              <p className="text-sm text-gray-500 mb-3">2026</p>
              <p className="text-sm text-gray-600 hover:text-gray-800 transition">Sertifikasi profesional arsitektur komputasi awan dan implementasi infrastruktur digital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK SECTION */}
      <section id="kontak" className="py-20 bg-gray-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Tertarik Bekerja Sama?</h2>
          <p className="text-gray-400 mb-8">Saya selalu terbuka untuk diskusi projek baru atau kesempatan kerja penuh waktu.</p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <a href="mailto:emailanda@gmail.com" className="flex items-center gap-2 hover:text-indigo-400 font-medium transition">
              <Mail className="w-5 h-5" /> emailanda@gmail.com
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 font-medium transition">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-400 font-medium transition">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-950 border-t border-gray-800">
        &copy; 2026 [Nama Anda]. All rights reserved.
      </footer>
    </div>
  );
}
