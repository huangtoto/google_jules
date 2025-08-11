document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const promptEl = document.getElementById('prompt');
    const outputEl = document.getElementById('code-output');

    const codeSnippets = [
        {
            prompt: "a button that changes color when clicked",
            code: `
const button = document.createElement('button');
button.textContent = 'Click me';
document.body.appendChild(button);

button.addEventListener('click', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    button.style.backgroundColor = randomColor;
});
            `
        },
        {
            prompt: "a counter that increments when a button is clicked",
            code: `
let count = 0;
const button = document.createElement('button');
const display = document.createElement('p');

button.textContent = 'Increment';
display.textContent = \`Count: \${count}\`;

document.body.appendChild(button);
document.body.appendChild(display);

button.addEventListener('click', () => {
    count++;
    display.textContent = \`Count: \${count}\`;
});
            `
        },
        {
            prompt: "a simple to-do list",
            code: `
const input = document.createElement('input');
const button = document.createElement('button');
const list = document.createElement('ul');

input.placeholder = 'New to-do';
button.textContent = 'Add';

document.body.appendChild(input);
document.body.appendChild(button);
document.body.appendChild(list);

button.addEventListener('click', () => {
    const item = document.createElement('li');
    item.textContent = input.value;
    list.appendChild(item);
    input.value = '';
});
            `
        }
    ];

    function applySyntaxHighlighting(code) {
        // This is a very basic simulation of syntax highlighting
        let highlightedCode = code.replace(/const|let|var/g, '<span class="keyword">const</span>');
        highlightedCode = highlightedCode.replace(/document|window|console/g, '<span class="dom">document</span>');
        highlightedCode = highlightedCode.replace(/function|\(\)|=>/g, '<span class="function">()=></span>');
        highlightedCode = highlightedCode.replace(/'[^']*'|"[^"]*"/g, '<span class="string">$&</span>');
        return highlightedCode;
    }

    generateBtn.addEventListener('click', () => {
        const prompt = promptEl.value;
        if (prompt) {
            const randomIndex = Math.floor(Math.random() * codeSnippets.length);
            const generatedCode = `// Generated code for: "${prompt}"\n${codeSnippets[randomIndex].code}`;
            outputEl.innerHTML = applySyntaxHighlighting(generatedCode);
        } else {
            outputEl.innerHTML = '<span class="comment">// Please enter a description of what you want to build.</span>';
        }
    });

    copyBtn.addEventListener('click', () => {
        const code = outputEl.textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        });
    });

    clearBtn.addEventListener('click', () => {
        outputEl.innerHTML = '';
        promptEl.value = '';
    });
});
