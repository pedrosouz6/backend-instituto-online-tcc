interface ValidationReturn {
    error: boolean,
    message: string
}

export class UserValidations {
    CPFValidation(cpf: string): ValidationReturn {
        cpf = cpf.replace(/[^\d]+/g,'');	
    
        if (cpf.length !== 11 || 
            cpf === "00000000000" || 
            cpf === "11111111111" || 
            cpf === "22222222222" || 
            cpf === "33333333333" || 
            cpf === "44444444444" || 
            cpf === "55555555555" || 
            cpf === "66666666666" || 
            cpf === "77777777777" || 
            cpf === "88888888888" || 
            cpf === "99999999999"
            ) 
            return { message: "CPF inválido", error: true };	
    
        let add = 0;
    
        for (let i=0; i < 9; i ++)		
            add += parseInt(cpf.charAt(i)) * (10 - i);	
            let rev = 11 - (add % 11);	
    
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(cpf.charAt(9)))		
                return { message: "CPF inválido", error: true };	
        
            add = 0;
                
            for (let i = 0; i < 10; i ++)		
                add += parseInt(cpf.charAt(i)) * (11 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)	
                rev = 0;	
            if (rev != parseInt(cpf.charAt(10)))
                return { message: "CPF inválido", error: true };	
        
        return { message: "CPF está correto", error: false };	
    }

    DateValidation(date: string): ValidationReturn {
        const newDate = new Date().toISOString().split('T')[0];
        const patternData: RegExp = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
    
        if(!patternData.test(date)) {
            return { error: true, message: "O formato da data está errado. Ex: YYYY-MM-DD" };
        }
    
        const dateNow = newDate.split('-');
        const dateBorn = date.split('-');
    
        if(dateBorn[0] > dateNow[0]) {
            return { error: true, message: `O ano deve ser igual ou menor que ${dateNow[0]}` }; 
        }
    
        if(dateBorn[0] == dateNow[0] && dateBorn[1] > dateNow[1]) {
            return { error: true, message:  `O mês não pode ser maior que ${dateNow[1]}, em ${dateNow[0]}` }; 
        }
    
        if(dateBorn[2] > dateNow[2] && dateBorn[1] == dateBorn[1] && dateBorn[0] == dateNow[0]) {
            return { error: true, message:  `O dia não pode ser maior que ${dateNow[2]}, em ${dateNow[1]}/${dateNow[0]}` }; 
        }
    
        return { error: false, message: "A data está correta" };  
    }

    EmailValidation(email: string): ValidationReturn {
        const validateEmail: RegExp = /\S+@\S+\.\S+/;
    
        if(email.length > 250) {
            return { error: true, message: "O e-mail é muito extenso" };
        }
    
        if(validateEmail.test(email)) {
            return { error: false, message: "O e-mail está correto" };
        }
    
        return { error: true, message: "O e-mail está errado" };
    } 

    NameValidation(name: string): ValidationReturn {
    
        if(name.length < 2) {
            return { message: "O nome deve ser maior que 1 caracter", error: true };
        }
    
        if(name.length > 119) {
            return { message: "O nome deve ser menor que 120 caracter", error: true };
        }
    
        return { message: "O nome está correto", error: false };
    }

    PasswordValidation(password: string): ValidationReturn {
        if(password.length < 5) {
            return { message: 'A senha deve ser maior que 4 caracteres', error: true };
        }
    
        if(password.length > 31) {
            return { message: 'A senha deve ser menor que 32 caracteres', error: true };
        }
    
        return { message: 'A senha está correta', error: false };
    }

    TelValidation(tel: string): ValidationReturn {
        tel = tel.replace(/\D/g, '');
    
        if (!(tel.length >= 10 && tel.length <= 11)) {
            return { error: true, message: "O telefone está errado" };
        }
    
        if (tel.length == 11 && parseInt(tel.substring(2, 3)) != 9) {
            return { error: true, message: "O telefone deve começar pelo número 9" };
        }
    
        const codesDDD: Array<number> = 
        [
            11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 24, 27, 28, 31, 32, 33, 34,
            35, 37, 38, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 51, 53, 54, 55, 61, 62,
            64, 63, 65, 66, 67, 68, 69, 71, 73,
            74, 75, 77, 79, 81, 82, 83, 84, 85,
            86, 87, 88, 89, 91, 92, 93, 94, 95,
            96, 97, 98, 99
        ];
    
        if (codesDDD.indexOf(parseInt(tel.substring(0, 2))) == -1) {
            return { error: true, message: "O DDD não é válido" };
        }
    
        return { error: false, message: "O Telefone está correto" };
    }

    OfficeValidation(office: string): ValidationReturn {
        if(!(office === 'Balé' || office === 'Creches comunitárias' || office === 'Judô' || office === 'Horta' || office === 'diretor' || office === 'gestor' || office === 'Usuário Comum' || office === 'rh' || office === 'ti' || office === 'usuario' || office === 'administrador')) {
            return { message: 'O cargo não está correto', error: true };
        }
    
        return { message: 'O cargo está correto', error: false };
    }
}