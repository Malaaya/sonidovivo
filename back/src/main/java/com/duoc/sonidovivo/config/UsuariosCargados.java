package com.duoc.sonidovivo.config;

import com.duoc.sonidovivo.model.Rol;
import com.duoc.sonidovivo.model.Usuario;
import com.duoc.sonidovivo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "app.seed-users", name = "enabled", havingValue = "true")
public class UsuariosCargados implements ApplicationRunner {

    private static final int LARGO_MINIMO_CONTRASENA = 8;

    private final UsuarioRepository repositorioUsuarios;
    private final PasswordEncoder codificadorContrasenas;
    private final String contrasenaAdmin;
    private final String contrasenaVendedor;
    private final String contrasenaCliente;

    public UsuariosCargados(
            UsuarioRepository repositorioUsuarios,
            PasswordEncoder codificadorContrasenas,
            @Value("${app.seed-users.admin-password:}") String contrasenaAdmin,
            @Value("${app.seed-users.seller-password:}") String contrasenaVendedor,
            @Value("${app.seed-users.customer-password:}") String contrasenaCliente) {
        this.repositorioUsuarios = repositorioUsuarios;
        this.codificadorContrasenas = codificadorContrasenas;
        this.contrasenaAdmin = contrasenaAdmin;
        this.contrasenaVendedor = contrasenaVendedor;
        this.contrasenaCliente = contrasenaCliente;
    }

    @Override
    public void run(ApplicationArguments argumentos) {
        validarContrasena(contrasenaAdmin, "app.seed-users.admin-password");
        validarContrasena(contrasenaVendedor, "app.seed-users.seller-password");
        validarContrasena(contrasenaCliente, "app.seed-users.customer-password");

        cargarUsuario(
                "admin@sonidovivo.cl", "Administrador", "11111111-1", contrasenaAdmin, Rol.ADMIN);
        cargarUsuario(
                "vendedor@sonidovivo.cl", "Vendedor", "22222222-2", contrasenaVendedor, Rol.VENDEDOR);
        cargarUsuario(
                "cliente@sonidovivo.cl", "Cliente", "33333333-3", contrasenaCliente, Rol.CLIENTE);
    }

    private void validarContrasena(String contrasena, String propiedad) {
        if (contrasena == null || contrasena.length() < LARGO_MINIMO_CONTRASENA) {
            throw new IllegalStateException(
                    "La propiedad " + propiedad
                            + " debe tener al menos " + LARGO_MINIMO_CONTRASENA
                            + " caracteres cuando la carga inicial de usuarios está habilitada.");
        }
    }

    private void cargarUsuario(
            String correo, String nombre, String run, String contrasena, Rol rol) {
        Usuario usuario = repositorioUsuarios.findByEmailIgnoreCase(correo)
                .orElseGet(() -> {
                    Usuario nuevoUsuario = new Usuario();
                    nuevoUsuario.setRun(run);
                    nuevoUsuario.setNombre(nombre);
                    nuevoUsuario.setEmail(correo);
                    nuevoUsuario.setRol(rol);
                    return nuevoUsuario;
                });
        usuario.setPassword(codificadorContrasenas.encode(contrasena));
        repositorioUsuarios.save(usuario);
    }
}
