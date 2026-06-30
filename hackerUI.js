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
            outline: none;
            user-select: none;
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
            display: flex;
            align-items: center;
        }
        .hacker-option input {
            margin-right: 10px;
            cursor: pointer;
            outline: none;
        }
        .hacker-option label {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'hacker-btn';
    btn.textContent = 'HACKS';
    btn.tabIndex = -1;
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = 'hacker-panel';
    document.body.appendChild(panel);

    const hacks = [
        { id: 'godMode', label: 'God Mode' },
        { id: 'infiniteGrenades', label: 'Infinite Grenades' },
        { id: 'rapidFire', label: 'Rapid Fire' },
        { id: 'fastGrenades', label: 'Fast Grenades' },
        { id: 'noRecoil', label: 'No Recoil' },
        { id: 'infiniteJump', label: 'Infinite Jump' },
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
        cb.tabIndex = -1;
        cb.onchange = () => {
            hackerSettings[hack.id] = cb.checked;
            cb.blur();
            document.body.focus();
        };

        const label = document.createElement('label');
        label.htmlFor = 'hack-' + hack.id;
        label.textContent = hack.label;

        div.appendChild(cb);
        div.appendChild(label);
        panel.appendChild(div);
    });

    const preventEngineInput = (e) => {
        e.stopPropagation();
    };

    [btn, panel].forEach(el => {
        el.addEventListener('mousedown', preventEngineInput);
        el.addEventListener('mouseup', preventEngineInput);
        el.addEventListener('click', preventEngineInput);
        el.addEventListener('mousemove', preventEngineInput);
        el.addEventListener('contextmenu', preventEngineInput);
        el.addEventListener('wheel', preventEngineInput);
    });

    btn.onclick = (e) => {
        panel.style.display = getComputedStyle(panel).display === 'none' ? 'block' : 'none';
        btn.blur();
        document.body.focus();
    };

    // Ensure clicks on these elements don't keep focus
    // and don't trigger game actions.
    // We use capture: true because the UI elements stop propagation.
    const refocus = (e) => {
        if (panel.contains(e.target) || btn.contains(e.target)) {
            setTimeout(() => {
                document.body.focus();
            }, 0);
        }
    };
    document.addEventListener('mousedown', refocus, true);
    document.addEventListener('mouseup', refocus, true);

})();
