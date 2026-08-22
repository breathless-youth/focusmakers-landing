import type { Metadata } from "next";
import Link from "next/link";
import { OG_COMMON, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: "포메 서비스 이용약관",
  alternates: { canonical: "/terms" },
  openGraph: { ...OG_COMMON, url: "/terms" },
};

function Section({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">
        제{no}조 ({title})
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 md:py-24">
      <header className="mb-12 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {SITE.appName} ({SITE.appNameKo})
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          이용약관
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시행일: 2026년 7월 26일
        </p>
      </header>

      <div className="space-y-10">
        <Section no={1} title="목적">
          <p>
            본 약관은 {SITE.teamName}(이하 &ldquo;팀&rdquo;)이 제공하는 공부
            집중 측정 서비스 {SITE.appName}(이하 &ldquo;서비스&rdquo;)의 이용
            조건과 절차, 팀과 이용자의 권리와 의무를 정하는 것을 목적으로
            합니다.
          </p>
        </Section>

        <Section no={2} title="정의">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              &ldquo;서비스&rdquo;란 기기 내 AI로 공부 상태를 감지해 순공
              시간을 측정하고, 통계와 스트릭 등 관련 기능을 제공하는 모바일
              애플리케이션을 말합니다.
            </li>
            <li>
              &ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 사람을
              말합니다.
            </li>
            <li>
              &ldquo;공부 기록&rdquo;이란 서비스가 측정한 세션 시간, 순공
              시간, 집중 상태 이벤트와 그로부터 만들어지는 통계를 말합니다.
            </li>
            <li>
              &ldquo;기기 식별자&rdquo;란 앱 최초 실행 시 자동 생성되어 공부
              기록을 구분하는 데 사용되는 무작위 식별자를 말합니다.
            </li>
          </ul>
        </Section>

        <Section no={3} title="약관의 효력과 변경">
          <p>
            본 약관은 앱 또는 웹사이트에 게시함으로써 효력이 발생합니다. 팀은
            관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경
            시 시행 7일 전부터 앱 내 공지 또는 본 페이지를 통해 알립니다.
            다만 이용자에게 불리한 변경의 경우 시행 30일 전부터 알립니다.
          </p>
          <p>
            변경된 약관 시행 후에도 서비스를 계속 이용하면 변경에 동의한
            것으로 봅니다. 변경에 동의하지 않는 이용자는 앱을 삭제하여 이용을
            중단할 수 있습니다.
          </p>
        </Section>

        <Section no={4} title="서비스의 내용">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>기기 내 AI 기반 공부 상태 감지 및 순공 시간 측정</li>
            <li>일간, 주간, 월간 공부 통계와 스트릭(연속 기록) 제공</li>
            <li>문의 접수 및 응대</li>
          </ul>
          <p>
            서비스는 별도의 회원가입 없이 무료로 이용할 수 있으며, 공부
            기록은 앱 최초 실행 시 생성되는 기기 식별자를 기준으로
            저장됩니다.
          </p>
        </Section>

        <Section no={5} title="측정의 한계">
          <p>
            순공 시간은 기기 내 AI가 카메라 영상을 분석해 추정한 값으로,
            촬영 각도, 조명, 기기 성능 등에 따라 실제와 오차가 있을 수
            있습니다.
          </p>
          <p>
            공부 기록은 이용자의 학습 참고용 정보이며, 팀은 측정 결과의
            완전한 정확성을 보증하지 않습니다.
          </p>
          <p>
            이용자는 측정 결과를 성적, 평가, 증명 등 공적인 목적의 근거로
            사용해서는 안 되며, 그로 인해 발생하는 결과에 대해 팀은 책임지지
            않습니다.
          </p>
        </Section>

        <Section no={6} title="기록의 저장과 보관의 한계">
          <p>공부 기록은 기기 식별자를 기준으로 팀의 서버에 저장됩니다.</p>
          <p>
            서비스는 회원가입과 로그인 절차를 두지 않으므로, 이용자가 앱을
            삭제하거나 기기를 변경하는 경우 기존에 저장된 공부 기록에 다시
            접근할 수 없습니다. 팀은 이 경우 기록을 복구할 의무를 지지
            않습니다.
          </p>
          <p>
            이용자는 언제든지 개인정보처리방침에 안내된 연락처로 요청하여
            자신의 공부 기록 전체를 삭제할 수 있으며, 삭제된 기록은
            복구되지 않습니다.
          </p>
        </Section>

        <Section no={7} title="카메라의 사용">
          <p>
            서비스는 집중 상태를 감지하기 위해 이용자가 측정을 시작한 경우에
            한해 카메라를 사용합니다.
          </p>
          <p>
            카메라 영상은 기기 안에서만 분석되며, 서버로 전송되거나 저장되지
            않습니다. 서비스는 얼굴을 식별하거나 생체인식정보를 생성하지
            않습니다.
          </p>
        </Section>

        <Section no={8} title="이용자의 의무">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              비정상적인 방법으로 공부 기록을 조작하거나 서비스 운영을
              방해하는 행위
            </li>
            <li>
              서비스를 역설계, 복제, 변조하거나 이를 시도하는 행위
            </li>
            <li>서버에 과도한 부하를 유발하는 자동화된 접근 행위</li>
            <li>관련 법령에 위반되는 목적으로 서비스를 이용하는 행위</li>
          </ul>
          <p>
            위반 시 팀은 해당 이용자의 서비스 이용을 제한하거나 관련 기록을
            삭제할 수 있습니다.
          </p>
        </Section>

        <Section no={9} title="미성년자의 이용">
          <p>
            만 14세 미만인 자는 법정대리인의 동의 없이 서비스를 이용할 수
            없습니다.
          </p>
          <p>
            미성년자가 서비스를 이용하는 경우, 법정대리인은 언제든지 해당
            이용자의 정보 삭제를 요청할 수 있습니다.
          </p>
        </Section>

        <Section no={10} title="개인정보 보호">
          <p>
            팀은 관련 법령과{" "}
            <Link
              href={SITE.privacyPath}
              className="underline underline-offset-4"
            >
              개인정보처리방침
            </Link>
            에 따라 이용자의 정보를 보호합니다.
          </p>
        </Section>

        <Section no={11} title="서비스의 변경과 중단">
          <p>
            팀은 운영상, 기술상 필요에 따라 서비스의 전부 또는 일부를
            변경하거나 중단할 수 있습니다.
          </p>
          <p>
            서비스를 종료하는 경우 30일 전에 앱 내 공지로 알리며, 이용자가
            기록을 확인하거나 내려받을 수 있도록 합리적인 기간을 둡니다.
          </p>
        </Section>

        <Section no={12} title="면책">
          <p>
            팀은 천재지변, 통신 장애 등 불가항력으로 인한 서비스 중단, 또는
            이용자의 귀책 사유로 발생한 손해에 대해 책임을 지지 않습니다.
          </p>
          <p>
            무료로 제공되는 서비스의 이용과 관련하여 관련 법령에 특별한
            규정이 없는 한 팀은 책임을 부담하지 않습니다.
          </p>
        </Section>

        <Section no={13} title="준거법과 분쟁 해결">
          <p>
            본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련한
            분쟁은 민사소송법에 따른 관할 법원에서 다룹니다.
          </p>
        </Section>

        <Section no={14} title="문의">
          <p>
            서비스와 약관에 관한 문의는 {SITE.supportEmail} 로 보내 주시기
            바랍니다.
          </p>
        </Section>
      </div>

      <footer className="mt-16 flex items-center gap-6 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Link href="/" className="underline underline-offset-4">
          {SITE.appName} 홈으로
        </Link>
        <Link href={SITE.privacyPath} className="underline underline-offset-4">
          개인정보처리방침
        </Link>
      </footer>
    </main>
  );
}
