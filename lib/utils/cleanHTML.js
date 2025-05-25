export function cleanHTML(html) {
  if (!html) return "";

  return html
    .replace(/<p>(\s|&nbsp;|<br>)*<\/p>/gi, "") // hapus <p></p> kosong
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "<br>") // ubah <br><br> jadi 1 <br>
    .replace(/\s+/g, " ") // hapus spasi ganda
    .trim(); // hapus spasi awal/akhir
}
