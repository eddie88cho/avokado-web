/*
 * Avokado Company Web Application
 * : Avokado 회사 홈페이지 프로젝트
 * 2018-10
 */
package kr.co.avokado.company.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.avokado.company.web.component.AvkdControllerComponent;

/**
 * <p>웹 화면 컨트롤러</p>
 * @author Cho Hyun Kwon
 * @since
 */
@Controller
public class WebController extends AvkdControllerComponent {

	@GetMapping("/")
	public String indexPage() {
		return "/views/index";
	}
	
	@GetMapping("/mail")
	public String mailPage() {
		return "/views/mail/list";
	}
}
