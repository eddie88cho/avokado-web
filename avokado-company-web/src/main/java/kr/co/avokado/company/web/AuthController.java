package kr.co.avokado.company.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.avokado.company.web.component.AvkdControllerComponent;

/**
 * Avokado 그룹웨어 권한 컨트롤러
 * @author Cho Hyun Kwon
 *
 */
@Controller
public class AuthController extends AvkdControllerComponent {

	@GetMapping("/auth/login")
	public String loginPage() {
		return "/views/auth/login";
	}
}
