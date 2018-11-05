/*
 * Avokado Company Web Application
 * : Avokado 회사 홈페이지 프로젝트
 * 2018-10
 */
package kr.co.avokado.company.web.component;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;

import kr.co.avokado.utils.ClientUtils;

/**
 * <p>Avokado Web, Api 컨트롤러 최상위 클래스</p>
 * @author Cho Hyun Kwon
 *
 */
@Component
public class AvkdControllerComponent {

	@ModelAttribute
	public void necessaryModels(HttpServletRequest req, Model model) {
		/* 현재 시각 */
		model.addAttribute("localDateTime", LocalDateTime.now());
		
		/* user-agent */
		model.addAttribute("userOSName", getUserOSName(req));
	}

	/**
	 * User-agent 처리
	 * @param req
	 * @return
	 */
	private String getUserOSName(HttpServletRequest req) {
		String userOSName = ClientUtils.getUserOS(req);
		return userOSName;
	}
}
