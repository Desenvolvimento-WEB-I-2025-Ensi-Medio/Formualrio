document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("cpf");

    // Formatar CPF durante a digitação
    cpfInput.addEventListener("input", function () {
        let cpf = cpfInput.value.replace(/\D/g, "");
        
        // Limitar a quantidade de números para 11
        if (cpf.length > 11) cpf = cpf.substring(0, 11);

        // Formatar o CPF conforme a digitação
        cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
        
        cpfInput.value = cpf;
    });

    // Validar CPF ao enviar o formulário
    document.querySelector("form").addEventListener("submit", function (event) {
        if (!validarCPF(cpfInput.value)) {
            alert("CPF inválido! Por favor, insira um CPF válido.");
            cpfInput.focus();
            event.preventDefault();
        }
    });

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        return resto === parseInt(cpf[10]);
    }
});
