import { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Award, Edit3, Save, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import localforage from 'localforage';

// Default data
const DEFAULT_PORTFOLIO_DATA = {
  nama: "La Ode Suradin",
  profesi: "Web Developer / Designer",
  deskripsi: "Saya fokus membangun solusi digital yang estetik dan fungsional dengan antarmuka pengguna yang modern.",
  email: "laodesuradin@gmail.com",
  linkedin: "https://linkedin.com/in/username",
  github: "https://github.com/username",
  tahun: new Date().getFullYear(),
  projek: [
    {
      nama: "Nama Projek Pertama",
      deskripsi: "Penjelasan singkat tentang masalah yang Anda selesaikan dan teknologi/alat yang digunakan.",
      link: "#",
      warnaBg: "bg-indigo-200",
      warnaTeks: "text-indigo-700",
      gambarUrl: ""
    },
    {
      nama: "Nama Projek Kedua",
      deskripsi: "Penjelasan singkat tentang masalah yang Anda selesaikan dan teknologi/alat yang digunakan.",
      link: "#",
      warnaBg: "bg-purple-200",
      warnaTeks: "text-purple-700",
      gambarUrl: ""
    },
    {
      nama: "Nama Projek Ketiga",
      deskripsi: "Penjelasan singkat tentang masalah yang Anda selesaikan dan teknologi/alat yang digunakan.",
      link: "#",
      warnaBg: "bg-pink-200",
      warnaTeks: "text-pink-700",
      gambarUrl: ""
    }
  ],
  sertifikat: [
    {
      judul: "Bootcamp Web Development",
      penyelenggara: "Penyelenggara A",
      tahun: "2024",
      deskripsi: "Pelatihan intensif pengembangan frontend dan backend menggunakan teknologi terkini.",
      warnaBg: "bg-indigo-100",
      warnaTeks: "text-indigo-600",
      gambarUrl: ""
    },
    {
      judul: "UI/UX Design Masterclass",
      penyelenggara: "Penyelenggara B",
      tahun: "2025",
      deskripsi: "Pemahaman mendalam mengenai riset pengguna, wireframing, prototipe, dan usability testing.",
      warnaBg: "bg-purple-100",
      warnaTeks: "text-purple-600",
      gambarUrl: ""
    },
    {
      judul: "Sertifikasi Cloud Practitioner",
      penyelenggara: "Penyelenggara C",
      tahun: "2026",
      deskripsi: "Sertifikasi profesional arsitektur komputasi awan dan implementasi infrastruktur digital.",
      warnaBg: "bg-pink-100",
      warnaTeks: "text-pink-600",
      gambarUrl: ""
    }
  ]
};

export default function App() {
  const [data, setData] = useState(DEFAULT_PORTFOLIO_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Muat data dari localforage saat komponen dipasang
  useEffect(() => {
    async function loadData() {
      try {
        const localForageData = await localforage.getItem('portfolioData');
        const localStorageData = localStorage.getItem('portfolioData');
        
        if (localForageData) {
          setData(JSON.parse(localForageData as string));
        } else if (localStorageData) {
          setData(JSON.parse(localStorageData));
          // Migrate to localforage
          localforage.setItem('portfolioData', localStorageData).catch(e => console.error(e));
        }
      } catch (e) {
        console.error("Gagal memuat data", e);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  // Simpan data ke localforage setiap kali ada perubahan, untuk persistensi
  useEffect(() => {
    if (isLoaded) {
      localforage.setItem('portfolioData', JSON.stringify(data)).catch((e) => {
        console.error("Gagal menyimpan data", e);
      });
    }
  }, [data, isLoaded]);

  const handleChange = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayName: 'projek' | 'sertifikat', index: number, field: string, value: any) => {
    setData((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleRemoveItem = (arrayName: 'projek' | 'sertifikat', index: number) => {
    setData((prev) => {
      const newArray = prev[arrayName].filter((_, i) => i !== index);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleAddItem = (arrayName: 'projek' | 'sertifikat') => {
    setData((prev) => {
      let newItem: any = {};
      if (arrayName === 'projek') {
        newItem = { nama: "Projek Baru", deskripsi: "Deskripsi", link: "#", warnaBg: "bg-gray-200", warnaTeks: "text-gray-700", gambarUrl: "" };
      } else {
        newItem = { judul: "Sertifikat Baru", penyelenggara: "Penyelenggara", tahun: new Date().getFullYear().toString(), deskripsi: "Deskripsi", warnaBg: "bg-gray-100", warnaTeks: "text-gray-600", gambarUrl: "" };
      }
      return { ...prev, [arrayName]: [...prev[arrayName], newItem] };
    });
  };

  // Fungsi untuk mengonversi dan mengompres file gambar yang diunggah
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, arrayName: 'projek' | 'sertifikat', index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          handleArrayChange(arrayName, index, 'gambarUrl', dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen scroll-smooth pb-20">
      
      {/* Tombol Floating Edit Mode */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-xl text-white font-medium transition-all ${
            isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isEditing ? <><Save className="w-5 h-5" /> Selesai Edit</> : <><Edit3 className="w-5 h-5" /> Mode Edit</>}
        </button>
      </div>

      {/* NAVBAR */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-40">
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
        <div className="max-w-4xl mx-auto text-center relative">
          {isEditing ? (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 max-w-xl mx-auto text-left space-y-4">
              <h3 className="font-bold text-indigo-700 mb-2 border-b pb-2">Edit Profil</h3>
              <div>
                <label className="block text-sm font-semibold mb-1">Nama</label>
                <input value={data.nama} onChange={e => handleChange('nama', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Profesi</label>
                <input value={data.profesi} onChange={e => handleChange('profesi', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Deskripsi Singkat</label>
                <textarea value={data.deskripsi} onChange={e => handleChange('deskripsi', e.target.value)} className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-500" rows={3}></textarea>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Hai, Saya <span className="text-indigo-600">{data.nama}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed text-justify">
                Seorang <span className="font-semibold text-gray-800">{data.profesi}</span> yang {data.deskripsi.toLowerCase()}
              </p>
              <div className="flex justify-center gap-4">
                <a href="#projek" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 font-medium transition">
                  Lihat Karya
                </a>
                <a href="#kontak" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 font-medium transition">
                  Hubungi Saya
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* PROJEK SECTION */}
      <section id="projek" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-950">Projek Pilihan</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projek.map((projek, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group relative flex flex-col h-full border border-gray-100">
              {isEditing && (
                <button onClick={() => handleRemoveItem('projek', index)} className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              <div className={`h-48 ${projek.warnaBg} relative flex items-center justify-center ${projek.warnaTeks} font-bold overflow-hidden shrink-0`}>
                {projek.gambarUrl ? (
                  <img src={projek.gambarUrl} alt={projek.nama} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <span className="opacity-70 group-hover:scale-105 transition-transform duration-300">
                    <ImageIcon className="w-12 h-12 mb-2 mx-auto" />
                    [ Gambar Projek {index + 1} ]
                  </span>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Unggah Gambar
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'projek', index)} />
                    </label>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {isEditing ? (
                  <div className="space-y-3 flex-1">
                    <input placeholder="Nama Projek" value={projek.nama} onChange={e => handleArrayChange('projek', index, 'nama', e.target.value)} className="w-full border-b pb-1 font-bold text-xl focus:outline-none focus:border-indigo-500" />
                    <textarea placeholder="Deskripsi Singkat" value={projek.deskripsi} onChange={e => handleArrayChange('projek', index, 'deskripsi', e.target.value)} className="w-full border rounded p-2 text-sm focus:outline-none focus:border-indigo-500" rows={3}></textarea>
                    <input placeholder="Link URL" value={projek.link} onChange={e => handleArrayChange('projek', index, 'link', e.target.value)} className="w-full border-b pb-1 text-sm text-indigo-600 focus:outline-none focus:border-indigo-500" />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{projek.nama}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1 text-justify">
                      {projek.deskripsi}
                    </p>
                    <a href={projek.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline text-sm inline-flex items-center gap-1 mt-auto">
                      Lihat Detail <ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
          
          {isEditing && (
            <button onClick={() => handleAddItem('projek')} className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-indigo-500 hover:bg-indigo-100 hover:border-indigo-300 transition group">
              <Plus className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Tambah Projek</span>
            </button>
          )}
        </div>
      </section>

      {/* SERTIFIKAT SECTION */}
      <section id="sertifikat" className="py-20 px-4 max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-950">Sertifikat Pelatihan</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.sertifikat.map((serti, index) => (
            <div key={index} className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition flex flex-col relative">
              {isEditing && (
                <button onClick={() => handleRemoveItem('sertifikat', index)} className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              {/* Tempat Gambar Sertifikat */}
              {(serti.gambarUrl || isEditing) && (
                <div className="bg-gray-100 h-40 relative flex items-center justify-center border-b">
                  {serti.gambarUrl ? (
                    <img src={serti.gambarUrl} alt={serti.judul} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center gap-2">
                       <Award className="w-8 h-8 opacity-50" />
                       <span className="text-sm font-medium">Belum ada gambar sertifikat</span>
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Unggah
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'sertifikat', index)} />
                      </label>
                    </div>
                  )}
                </div>
              )}

              <div className="p-5 flex items-start gap-4 flex-1">
                {!serti.gambarUrl && !isEditing && (
                   <div className={`${serti.warnaBg} p-3 rounded-lg ${serti.warnaTeks} shrink-0`}>
                     <Award className="w-6 h-6" />
                   </div>
                )}
                <div className="flex-1 w-full">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input placeholder="Judul Sertifikat" value={serti.judul} onChange={e => handleArrayChange('sertifikat', index, 'judul', e.target.value)} className="w-full border-b pb-1 font-bold text-gray-900 focus:outline-none focus:border-indigo-500" />
                      <div className="flex gap-2">
                        <input placeholder="Penyelenggara" value={serti.penyelenggara} onChange={e => handleArrayChange('sertifikat', index, 'penyelenggara', e.target.value)} className="flex-1 border-b pb-1 text-sm font-medium text-indigo-600 focus:outline-none" />
                        <input placeholder="Tahun" value={serti.tahun} onChange={e => handleArrayChange('sertifikat', index, 'tahun', e.target.value)} className="w-20 border-b pb-1 text-sm text-gray-500 text-center focus:outline-none" />
                      </div>
                      <textarea placeholder="Deskripsi Singkat" value={serti.deskripsi} onChange={e => handleArrayChange('sertifikat', index, 'deskripsi', e.target.value)} className="w-full border rounded p-2 text-xs focus:outline-none focus:border-indigo-500" rows={2}></textarea>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-lg mb-1 text-gray-900 leading-tight">{serti.judul}</h3>
                      <p className={`text-sm ${serti.warnaTeks} font-semibold mb-1`}>{serti.penyelenggara}</p>
                      <p className="text-xs text-gray-500 mb-3 bg-gray-100 inline-block px-2 py-0.5 rounded">{serti.tahun}</p>
                      <p className="text-sm text-gray-600 leading-relaxed text-justify">{serti.deskripsi}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isEditing && (
            <button onClick={() => handleAddItem('sertifikat')} className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl min-h-[200px] flex flex-col items-center justify-center text-indigo-500 hover:bg-indigo-100 hover:border-indigo-300 transition group">
              <Plus className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Tambah Sertifikat</span>
            </button>
          )}
        </div>
      </section>

      {/* KONTAK SECTION */}
      <section id="kontak" className="py-20 bg-gray-900 text-white px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center relative">
          {isEditing ? (
             <div className="bg-white/10 p-6 rounded-xl border border-white/20 max-w-xl mx-auto text-left space-y-4 text-white">
                <h3 className="font-bold text-indigo-300 mb-2 border-b border-white/20 pb-2">Edit Kontak</h3>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">Email</label>
                  <input value={data.email} onChange={e => handleChange('email', e.target.value)} className="w-full bg-white/5 border border-white/20 rounded p-2 focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">LinkedIn URL</label>
                  <input value={data.linkedin} onChange={e => handleChange('linkedin', e.target.value)} className="w-full bg-white/5 border border-white/20 rounded p-2 focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">GitHub URL</label>
                  <input value={data.github} onChange={e => handleChange('github', e.target.value)} className="w-full bg-white/5 border border-white/20 rounded p-2 focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400" />
                </div>
             </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Tertarik Bekerja Sama?</h2>
              <p className="text-gray-400 mb-8">Saya selalu terbuka untuk diskusi projek baru atau kesempatan kerja penuh waktu.</p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 font-medium transition group">
                  <span className="p-2 bg-white/10 rounded-lg group-hover:bg-indigo-500/20 transition"><Mail className="w-5 h-5" /></span> {data.email}
                </a>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 font-medium transition group">
                  <span className="p-2 bg-white/10 rounded-lg group-hover:bg-indigo-500/20 transition"><Linkedin className="w-5 h-5" /></span> LinkedIn
                </a>
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-indigo-400 font-medium transition group">
                   <span className="p-2 bg-white/10 rounded-lg group-hover:bg-indigo-500/20 transition"><Github className="w-5 h-5" /></span> GitHub
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-950 border-t border-gray-800">
        &copy; {data.tahun} {data.nama}. All rights reserved.
      </footer>
    </div>
  );
}


