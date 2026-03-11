const CartSystem = {
    storageKey: 'mighty_config_data',
    state: { items: [], total: 0 },

    init() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) this.state = JSON.parse(saved);
        this.updateUI();
    },

    addItem(id, name, price) {
        const existing = this.state.items.find(i => i.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.state.items.push({ id, name, price, qty: 1 });
        }
        this.sync();
        this.toggleCart(true); // Отваря кошницата при добавяне
    },

    removeItem(id) {
        this.state.items = this.state.items.filter(i => i.id !== id);
        this.sync();
    },

    sync() {
        this.state.total = this.state.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        this.updateUI();
    },

    updateUI() {
        const count = this.state.items.reduce((sum, i) => sum + i.qty, 0);
        document.querySelectorAll('.cart-count').forEach(el => el.innerText = count);
        
        const totalFormatted = new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'BGN' }).format(this.state.total);
        document.querySelectorAll('.cart-total').forEach(el => el.innerText = totalFormatted);

        const list = document.getElementById('cart-items-list');
        if (!list) return;

        if (this.state.items.length === 0) {
            list.innerHTML = `<p class="text-gray-400 text-center py-10 uppercase text-xs tracking-widest">Няма избрани модули</p>`;
            return;
        }

        list.innerHTML = this.state.items.map(item => `
            <div class="flex justify-between items-center bg-sand/30 p-4 rounded-xl">
                <div>
                    <h4 class="font-bold text-sm uppercase">${item.name}</h4>
                    <p class="text-xs text-gray-500">Количество: ${item.qty}</p>
                    <button onclick="CartSystem.removeItem('${item.id}')" class="text-[10px] text-red-600 font-bold uppercase mt-2">Премахни</button>
                </div>
                <div class="font-bold">${(item.price * item.qty).toLocaleString()} лв.</div>
            </div>
        `).join('');
    },

    toggleCart(forceOpen = false) {
        const drawer = document.getElementById('cart-drawer');
        if (forceOpen) drawer.classList.add('open');
        else drawer.classList.toggle('open');
    }
};

// Глобална функция за бутоните в HTML
function toggleCart() { CartSystem.toggleCart(); }

document.addEventListener('DOMContentLoaded', () => CartSystem.init());