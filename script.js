document.addEventListener('DOMContentLoaded', () => {
    const resizable = document.querySelector('.resizable');

    resizable.addEventListener('mousedown', (e) => {
        // Check if the click is on the border (5px from the edges)
        const borderWidth = 5;
        const rect = resizable.getBoundingClientRect();
        const isResizing =
            e.clientX >= rect.right - borderWidth ||
            e.clientY >= rect.bottom - borderWidth;

        if (!isResizing) return;

        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(document.defaultView.getComputedStyle(resizable).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(resizable).height, 10);

        const doDrag = (dragEvent) => {
            resizable.style.width = startWidth + dragEvent.clientX - startX + 'px';
            resizable.style.height = startHeight + dragEvent.clientY - startY + 'px';
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    });
});
