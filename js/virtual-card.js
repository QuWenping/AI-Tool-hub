(function () {
    const STORAGE_KEY = 'aih_card_orders';
    const STATUSES = ['Pending review', 'Payment sent', 'Processing', 'Delivered', 'Cancelled'];

    function getOrders() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveOrders(orders) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }

    function createOrderId() {
        const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.random().toString(36).slice(2, 7).toUpperCase();
        return `AIC-${stamp}-${random}`;
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function initPackageCards() {
        const budgetInput = document.getElementById('budget');
        const noteInput = document.getElementById('request-note');
        document.querySelectorAll('.package-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.package-card').forEach(item => item.classList.remove('selected-package'));
                card.classList.add('selected-package');
                if (budgetInput) budgetInput.value = card.dataset.amount || '';
                if (noteInput && !noteInput.value) {
                    noteInput.value = `Selected package: ${card.dataset.package || 'Custom'}`;
                }
            });
        });
    }

    function initRequestForm() {
        const form = document.getElementById('virtual-card-form');
        if (!form) return;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const order = {
                id: createOrderId(),
                email: formData.get('email'),
                contact: formData.get('contact'),
                tool: formData.get('tool'),
                budget: formData.get('budget'),
                payment: formData.get('payment'),
                note: formData.get('note'),
                status: 'Pending review',
                createdAt: new Date().toISOString()
            };

            const orders = getOrders();
            orders.unshift(order);
            saveOrders(orders);
            form.reset();

            const success = document.getElementById('order-success');
            if (success) {
                const subject = encodeURIComponent(`AI subscription request ${order.id}`);
                const body = encodeURIComponent(`Order ID: ${order.id}\nTool: ${order.tool}\nBudget: $${order.budget}\nPayment: ${order.payment}`);
                success.hidden = false;
                success.innerHTML = `
                    <strong>申请已生成</strong>
                    <p>订单号：${order.id}</p>
                    <div class="success-actions">
                        <a href="orders.html" class="ad-button">查看订单</a>
                        <a href="mailto:qiuranlong@126.com?subject=${subject}&body=${body}" class="ad-button secondary-button">邮件确认</a>
                    </div>
                `;
            }
        });
    }

    function renderOrders(filter = '') {
        const list = document.getElementById('orders-list');
        if (!list) return;

        const normalized = filter.trim().toLowerCase();
        const orders = getOrders().filter(order => {
            if (!normalized) return true;
            return [order.id, order.email, order.tool, order.status]
                .join(' ')
                .toLowerCase()
                .includes(normalized);
        });

        if (!orders.length) {
            list.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-inbox"></i>
                    <h2>暂无订单</h2>
                    <p>提交一条 AI 订阅申请后，这里会显示审核队列。</p>
                    <a href="virtual-card.html#card-request-form" class="cta-btn cta-primary">创建第一条申请</a>
                </div>
            `;
            return;
        }

        list.innerHTML = orders.map(order => {
            const statusOptions = STATUSES.map(status => {
                const selected = status === order.status ? 'selected' : '';
                return `<option value="${status}" ${selected}>${status}</option>`;
            }).join('');
            const created = new Date(order.createdAt).toLocaleString();
            const mailSubject = encodeURIComponent(`Update for ${order.id}`);
            const mailBody = encodeURIComponent(`Order ID: ${order.id}\nTool: ${order.tool}\nStatus: ${order.status}`);

            return `
                <article class="order-card" data-order-id="${escapeHtml(order.id)}">
                    <div class="order-card-main">
                        <div>
                            <span class="order-id">${escapeHtml(order.id)}</span>
                            <h2>${escapeHtml(order.tool)}</h2>
                            <p>${escapeHtml(order.email)} ${order.contact ? ` · ${escapeHtml(order.contact)}` : ''}</p>
                        </div>
                        <span class="status-pill">${escapeHtml(order.status)}</span>
                    </div>
                    <div class="order-meta-grid">
                        <div><span>Budget</span><strong>$${escapeHtml(order.budget)}</strong></div>
                        <div><span>Payment</span><strong>${escapeHtml(order.payment)}</strong></div>
                        <div><span>Created</span><strong>${created}</strong></div>
                    </div>
                    ${order.note ? `<p class="order-note">${escapeHtml(order.note)}</p>` : ''}
                    <div class="order-actions">
                        <select class="order-status-select" data-order-id="${escapeHtml(order.id)}">${statusOptions}</select>
                        <a class="ad-button" href="mailto:${escapeHtml(order.email)}?subject=${mailSubject}&body=${mailBody}">联系用户</a>
                    </div>
                </article>
            `;
        }).join('');
    }

    function initOrdersPage() {
        const list = document.getElementById('orders-list');
        if (!list) return;

        renderOrders();

        const searchInput = document.getElementById('order-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => renderOrders(searchInput.value));
        }

        list.addEventListener('change', event => {
            const select = event.target.closest('.order-status-select');
            if (!select) return;
            const orders = getOrders();
            const order = orders.find(item => item.id === select.dataset.orderId);
            if (order) {
                order.status = select.value;
                saveOrders(orders);
                renderOrders(searchInput ? searchInput.value : '');
            }
        });

        const exportButton = document.getElementById('export-orders');
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                const rows = getOrders();
                const header = ['id', 'email', 'contact', 'tool', 'budget', 'payment', 'status', 'createdAt', 'note'];
                const csv = [
                    header.join(','),
                    ...rows.map(row => header.map(key => `"${String(row[key] || '').replace(/"/g, '""')}"`).join(','))
                ].join('\n');
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'ai-subscription-orders.csv';
                link.click();
                URL.revokeObjectURL(url);
            });
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        initPackageCards();
        initRequestForm();
        initOrdersPage();
    });
})();
