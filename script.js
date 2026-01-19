const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', function () {
        cursor.style.display = 'none';
    });

    document.addEventListener('mouseenter', function () {
        cursor.style.display = 'block';
    });

    const botaoTopo = document.getElementById('botao-topo');

    window.addEventListener('scroll', function(){
        if (window.pageYOffset > 300) {
            botaoTopo.classList.add('mostrar');
        } else{
            botaoTopo.classList.remove('mostrar');
        }
    });

    botaoTopo.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

