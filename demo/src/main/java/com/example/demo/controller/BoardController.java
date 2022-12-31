package com.example.demo.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.dao.BoardMapper;
import com.example.demo.model.dto.SearchDto;
import com.example.demo.model.entity.DiaryDto;
import com.example.demo.model.entity.UserEntity;
import com.example.demo.service.BoardService;
import com.example.demo.service.UserService;
import com.example.demo.util.SecurityUtil;

@RestController
@RequestMapping("/board")
public class BoardController {

	private final BoardMapper boardMapper;
	private final BoardService boardService;
	private final UserService userService;

	public BoardController(BoardMapper boardMapper, BoardService boardService, UserService userService) {
		this.boardMapper = boardMapper;
		this.boardService = boardService;
		this.userService = userService;

	}

	String UPLOAD_PATH = "C:\\dairyData";

	// 이미지 불러오기
	@GetMapping("/getImage/{fileId}/{fileType}")
	public ResponseEntity<byte[]> getImageFile(@PathVariable String fileId, @PathVariable String fileType) {

		try {
			FileInputStream fis = new FileInputStream(UPLOAD_PATH + "\\" + fileId + "." + fileType);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();

			byte buffer[] = new byte[1024];
			int length = 0;

			while ((length = fis.read(buffer)) != -1) {
				baos.write(buffer, 0, length);
			}

			System.out.println("fis: " + fis);
			System.out.println("fis: " + baos);

			return new ResponseEntity<byte[]>(baos.toByteArray(), HttpStatus.OK);

		} catch (IOException e) {
			return new ResponseEntity<byte[]>(new byte[] {}, HttpStatus.CONFLICT);
		}
	}

	// 이미지 업로드
	@PostMapping("/register/imageUpload")
	public ResponseEntity<Object> uploadImage(MultipartFile multipartFiles[]) {

		try {
			MultipartFile file = multipartFiles[0];

			// 현재 날짜와 랜덤 정수값으로 새로운 파일명 만들기
			String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
			String originName = file.getOriginalFilename(); // ex) 파일.jpg
			String fileExtension = originName.substring(originName.lastIndexOf(".") + 1); // ex) jpg
			originName = originName.substring(0, originName.lastIndexOf(".")); // ex) 파일
			long fileSize = file.getSize(); // 파일 사이즈

			File fileSave = new File(UPLOAD_PATH, fileId + "." + fileExtension); // ex) fileId.jpg
			if (!fileSave.exists()) { // 폴더가 없을 경우 폴더 만들기
				fileSave.mkdirs();
			}
			file.transferTo(fileSave); // fileSave의 형태로 파일 저장

			return new ResponseEntity<Object>("http://localhost:8080/board/getImage/" + fileId + "/" + fileExtension,
					HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<Object>(null, HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/saveQuill")
	public Integer saveQuill(@RequestBody DiaryDto data) {
		System.out.println("data is ... " + data);
		int success = boardService.saveQuill(data);
		return success;
	}

	@PostMapping("/updateQuill")
	public Integer updateQuill(@RequestBody DiaryDto data) {
		System.out.println("data is ... " + data);
		int success = boardService.updateQuill(data);
		return success;
	}

	@PostMapping("/getBoard")
	public List<DiaryDto> getBoard(@RequestBody DiaryDto data) {
		System.out.println("data=====================" + data);
		// String user = SecurityUtil.getCurrentUserId();
		// System.out.println("getBoard===========" + "diaryId==" + diaryId + "email=="
		// + email);
		return boardService.getBoard(data);
	}
	// AND diary_id=#{diary_id}

	@GetMapping("/getMonthBoard/{email}")
	public List<DiaryDto> getMonthBoard(@PathVariable("email") String email) {
		// System.out.println(boardMapper.getBoard().toString());

		return boardService.getMonthBoard(email);
	}

	@DeleteMapping("/deleteBoard/{id}")
	public Integer deleteBoard(@PathVariable("id") Integer id) {
		int success = boardMapper.deleteBoard(id);
		return success;
	}

	/**
	 * 게시판 월간 조회(선택한 month 통해 게시판 조회)
	 *
	 * @param month
	 * @return diary_table where month = month
	 */
	@GetMapping("/getMonth/{selectMonth}/{email}")
	public List<DiaryDto> getMonth(@PathVariable("selectMonth") String month, @PathVariable("email") String email) {
		return boardService.getMonth(month, email);
	}

	@PostMapping("/getMonthProgress")
	public List<DiaryDto> getMonthProgress(@RequestBody DiaryDto data) {
		return boardService.getMonthProgress(data);
	}

	/**
	 * 게시판 연간 조회(선택한 selectYear 통해 게시판 조회)
	 *
	 * @param selectYear
	 * @return diary_table where year = year
	 */
	@GetMapping("/getYear/{selectYear}/{email}")
	public List<DiaryDto> getYear(@PathVariable("selectYear") String year, @PathVariable("email") String email) {
		return boardService.getYear(year, email);
	}

	@GetMapping("/postFont/{fontChange}")
	public String postFont(@PathVariable("fontChange") String data) {
		System.out.println("======value====" + data);
		// customService.postFont(data);
		return "data" + data;
	}

	// @GetMapping("/getOneDiary/${diary_id}")
	// public List<DiaryDto> getOneDiary(@PathVariable("id") Long id) {
	// return boardMapper.getOneDiary(id);
	// }

}
// public ResponseEntity<Object> uploadTestPOST(MultipartFile[] uploadFile) {

// System.out.println("uploadFile: "+uploadFile);

// // 내가 업로드 파일을 저장할 경로
// String uploadFolder = "C:\\dairyData";
// SimpleDateFormat sdt = new SimpleDateFormat("yyyy-MM-dd");
// Date date = new Date();
// String formatDate = sdt.format(date);

// String datePath = formatDate.replace("-", File.separator);

// File uploadPath = new File(uploadFolder, datePath);

// // 해당 경로의 폴더가 존재하지 않을 경우
// if (uploadPath.exists() == false) {
// uploadPath.mkdirs(); // 해당 경로의 폴더 생성
// }
// for (MultipartFile multipartFile : uploadFile) {

// String uploadFileName = multipartFile.getOriginalFilename();
// String uuid = UUID.randomUUID().toString();
// uploadFileName = uuid + "_" + uploadFileName;
// // 저장할 파일, 생성자로 경로와 이름을 지정해줌.
// File saveFile = new File(uploadPath, uploadFileName);

// try {
// // void transferTo(File dest) throws IOException 업로드한 파일 데이터를 지정한 파일에 저장
// multipartFile.transferTo(saveFile);
// return new ResponseEntity<Object>(uploadFileName, HttpStatus.OK);
// } catch (Exception e) {
// e.printStackTrace();
// }
// }
// return null;

// }
