package member_service.service;

import org.springframework.stereotype.Service;

import member_service.model.Member;
import member_service.repository.MemberRepository;

import java.util.List;

@Service
public class MemberService {
	private final MemberRepository memberRepository;

	public MemberService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	public List<Member> getAllMembers() {
		return memberRepository.findAll();
	}

	public Member createMember(Member member) {
		return memberRepository.save(member);
	}

	public Member getMemberById(Long id) {
		return memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
	}
}
