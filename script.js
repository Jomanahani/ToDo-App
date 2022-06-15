const chk = document.getElementById('chk');
const date = new Date();
const format = { weekday: "long", month: "short", day: "numeric" };

let text = date.toLocaleDateString("English", format);
document.getElementById("date").textContent = text;

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});