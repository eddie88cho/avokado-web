/*
 * Avokado Company Web Application
 * : Avokado 회사 홈페이지 프로젝트
 * 2018-10
 */
package kr.co.avokado.company.domain;

import org.springframework.stereotype.Component;

/**
 * <p>Avokado 최상위 도메인 클래스</p>
 * @author Cho Hyun Kwon
 *
 */
@Component
public class AvkdBean {
	private String createDt;
	private String createId;
	
	private String modifyDt;
	private String modifyId;
	
	private String deleteDt;
	private String deleteId;
	
	
	/*********** TODO : LOMBOK 플러그인 사용하여 Get/Set 메서드 사용 안할 예정 **********/
	
	/**
	 * @return the createDt
	 */
	public String getCreateDt() {
		return createDt;
	}
	/**
	 * @param createDt the createDt to set
	 */
	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}
	/**
	 * @return the createId
	 */
	public String getCreateId() {
		return createId;
	}
	/**
	 * @param createId the createId to set
	 */
	public void setCreateId(String createId) {
		this.createId = createId;
	}
	/**
	 * @return the modifyDt
	 */
	public String getModifyDt() {
		return modifyDt;
	}
	/**
	 * @param modifyDt the modifyDt to set
	 */
	public void setModifyDt(String modifyDt) {
		this.modifyDt = modifyDt;
	}
	/**
	 * @return the modifyId
	 */
	public String getModifyId() {
		return modifyId;
	}
	/**
	 * @param modifyId the modifyId to set
	 */
	public void setModifyId(String modifyId) {
		this.modifyId = modifyId;
	}
	/**
	 * @return the deleteDt
	 */
	public String getDeleteDt() {
		return deleteDt;
	}
	/**
	 * @param deleteDt the deleteDt to set
	 */
	public void setDeleteDt(String deleteDt) {
		this.deleteDt = deleteDt;
	}
	/**
	 * @return the deleteId
	 */
	public String getDeleteId() {
		return deleteId;
	}
	/**
	 * @param deleteId the deleteId to set
	 */
	public void setDeleteId(String deleteId) {
		this.deleteId = deleteId;
	}
}
