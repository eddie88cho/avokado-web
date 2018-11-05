package kr.co.avokado.utils;

import javax.servlet.http.HttpServletRequest;

import lombok.experimental.UtilityClass;

/**
 * 서비스 사용자(client, user) 관련 유틸 클래스
 * 
 * @author Cho Hyun Kwon
 */
@UtilityClass
public abstract class ClientUtils {

	/**
	 * 요청 사용자의 OS 이름을 반환합니다.
	 * @param req
	 * @return User OS name
	 */
	public static String getUserOS(HttpServletRequest req) {
		String osName = getUserAgent(req);
		if( osName.contains("Win")) return "windows";
		if( osName.contains("Mac")) return "mac";
		if( osName.contains("X11")) return "unix";
		if( osName.contains("Linux")) return "linux";
		return "anonymous";
	}

	/**
	 * 요청 사용자의 User-Agent를 반환합니다.
	 * @param req
	 * @return
	 */
	public static String getUserAgent(HttpServletRequest req) {
		return req.getHeader("User-Agent");
	}
}
