(() => {
    const style = document.createElement('style');
    style.textContent = `
        #hacker-btn {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            padding: 5px 10px;
            background: rgba(0,0,0,0.5);
            color: #ff0;
            border: 1px solid #ff0;
            cursor: pointer;
            font-family: monospace;
        }
        #hacker-panel {
            position: fixed;
            top: 40px;
            right: 10px;
            z-index: 1000;
            background: rgba(0,0,0,0.8);
            color: #fff;
            border: 1px solid #fff;
            padding: 10px;
            display: none;
            font-family: monospace;
            user-select: none;
        }
        .hacker-option {
            margin-bottom: 5px;
        }
        .hacker-option input {
            margin-right: 10px;
        }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'hacker-btn';
    btn.textContent = 'HACKS';
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = 'hacker-panel';
    document.body.appendChild(panel);

    const hacks = [
        { id: 'godMode', label: 'God Mode' },
        { id: 'infiniteGrenades', label: 'Infinite Grenades' },
        { id: 'rapidFire', label: 'Rapid Fire' },
        { id: 'noRecoil', label: 'No Recoil' },
        { id: 'superSpeed', label: 'Super Speed' },
        { id: 'infiniteJump', label: 'Infinite Jump' },
        { id: 'highBulletSpeed', label: 'High Bullet Speed' },
        { id: 'oneHitKill', label: 'One Hit Kill' },
        { id: 'alwaysClimb', label: 'Always Climb' },
        { id: 'infiniteLives', label: 'Infinite Lives' },
        { id: 'invisible', label: 'Invisible' }
    ];

    hacks.forEach(hack => {
        const div = document.createElement('div');
        div.className = 'hacker-option';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.id = 'hack-' + hack.id;
        cb.checked = hackerSettings[hack.id];
        cb.onchange = () => { hackerSettings[hack.id] = cb.checked; };

        const label = document.createElement('label');
        label.htmlFor = 'hack-' + hack.id;
        label.textContent = hack.label;

        div.appendChild(cb);
        div.appendChild(label);
        panel.appendChild(div);
    });

    btn.onclick = () => {
        panel.style.display = getComputedStyle(panel).display === 'none' ? 'block' : 'none';
    };
})();
