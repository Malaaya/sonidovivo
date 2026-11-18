package com.duoc.sonidovivo.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import com.duoc.sonidovivo.model.Rol;
import com.duoc.sonidovivo.model.Usuario;
import com.duoc.sonidovivo.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.boot.DefaultApplicationArguments;
import org.springframework.security.crypto.password.PasswordEncoder;

class UsuariosCargadosTest {

    private final UsuarioRepository usuarioRepository = org.mockito.Mockito.mock(UsuarioRepository.class);
    private final PasswordEncoder passwordEncoder = org.mockito.Mockito.mock(PasswordEncoder.class);

    @BeforeEach
    void configurarEncoder() {
        when(passwordEncoder.encode(anyString()))
                .thenAnswer(invocation -> "bcrypt:" + invocation.getArgument(0, String.class));
    }

    @Test
    void creaLosTresUsuariosConRunYPasswordCodificados() throws Exception {
        when(usuarioRepository.findByEmailIgnoreCase(anyString())).thenReturn(Optional.empty());
        UsuariosCargados seed = crearSeed("adminPassword", "sellerPassword", "customerPassword");

        seed.run(new DefaultApplicationArguments());

        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
        verify(usuarioRepository, times(3)).save(captor.capture());
        List<Usuario> usuarios = captor.getAllValues();

        assertThat(usuarios).extracting(Usuario::getEmail).containsExactly(
                "admin@sonidovivo.cl",
                "vendedor@sonidovivo.cl",
                "cliente@sonidovivo.cl");
        assertThat(usuarios).extracting(Usuario::getRun).containsExactly(
                "11111111-1",
                "22222222-2",
                "33333333-3");
        assertThat(usuarios).extracting(Usuario::getRol).containsExactly(
                Rol.ADMIN,
                Rol.VENDEDOR,
                Rol.CLIENTE);
        assertThat(usuarios).extracting(Usuario::getPassword).containsExactly(
                "bcrypt:adminPassword",
                "bcrypt:sellerPassword",
                "bcrypt:customerPassword");
    }

    @Test
    void actualizaPasswordsDeUsuariosQueYaExisten() throws Exception {
        Usuario admin = usuarioExistente("admin@sonidovivo.cl");
        Usuario vendedor = usuarioExistente("vendedor@sonidovivo.cl");
        Usuario cliente = usuarioExistente("cliente@sonidovivo.cl");
        when(usuarioRepository.findByEmailIgnoreCase("admin@sonidovivo.cl")).thenReturn(Optional.of(admin));
        when(usuarioRepository.findByEmailIgnoreCase("vendedor@sonidovivo.cl")).thenReturn(Optional.of(vendedor));
        when(usuarioRepository.findByEmailIgnoreCase("cliente@sonidovivo.cl")).thenReturn(Optional.of(cliente));
        UsuariosCargados seed = crearSeed("adminPassword", "sellerPassword", "customerPassword");

        seed.run(new DefaultApplicationArguments());

        assertThat(admin.getPassword()).isEqualTo("bcrypt:adminPassword");
        assertThat(vendedor.getPassword()).isEqualTo("bcrypt:sellerPassword");
        assertThat(cliente.getPassword()).isEqualTo("bcrypt:customerPassword");
        verify(usuarioRepository, times(3)).save(any(Usuario.class));
    }

    @Test
    void fallaConMensajeClaroSiUnaPasswordTieneMenosDeOchoCaracteres() {
        UsuariosCargados seed = crearSeed("short", "sellerPassword", "customerPassword");

        assertThatThrownBy(() -> seed.run(new DefaultApplicationArguments()))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("app.seed-users.admin-password")
                .hasMessageContaining("al menos 8 caracteres");

        verifyNoInteractions(usuarioRepository, passwordEncoder);
    }

    private UsuariosCargados crearSeed(String adminPassword, String sellerPassword, String customerPassword) {
        return new UsuariosCargados(
                usuarioRepository,
                passwordEncoder,
                adminPassword,
                sellerPassword,
                customerPassword);
    }

    private Usuario usuarioExistente(String email) {
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setPassword("password-anterior");
        return usuario;
    }
}
