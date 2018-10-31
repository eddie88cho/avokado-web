/*
 * Avokado Company Web Application
 * : Avokado 회사 홈페이지 프로젝트
 * 2018-10
 */
package kr.co.avokado.company.web.component;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

/**
 * <p>Avokado Web, Api 컨트롤러 최상위 클래스</p>
 * @author Cho Hyun Kwon
 *
 */
@Component
public class AvkdControllerComponent {

	@ModelAttribute
	public void currentDateTimesOnPage(Model model) {
		model.addAttribute("localDateTime", LocalDateTime.now());
	}
}
