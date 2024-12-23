package member_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import member_service.model.Member;
import member_service.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {
	private final MemberService memberService;

	public MemberController(MemberService memberService) {
			this.memberService = memberService;
	}

	@GetMapping
	public List<Member> getAllMembers() {
		return memberService.getAllMembers();
	}

	@PostMapping
	public ResponseEntity<Member> createMember(@RequestBody Member member) {
		return ResponseEntity.ok(memberService.createMember(member));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
			return ResponseEntity.ok(memberService.getMemberById(id));
	}
}
