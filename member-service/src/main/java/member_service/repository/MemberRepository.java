package member_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import member_service.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
