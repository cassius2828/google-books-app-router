import { notFound } from "next/navigation";
import {
  getUserReadingList,
  getUserProfile,
  getPublicUserID,
} from "@/app/_lib/service";
import { auth } from "@/app/_lib/auth";
import ReadingListPageContent from "./_components/ReadingListPageContent";

export default async function ReadingListPage(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  const session = await auth();
  let currentUserId: string | null = null;
  if (session?.user?.email) {
    currentUserId = await getPublicUserID(session.user.email);
  }

  const isOwner = currentUserId === userId;

  const profile = await getUserProfile(userId);

  if (!isOwner && !profile?.isProfilePublic) notFound();

  const favoriteBookIds = profile?.favoriteBooks.map((b) => b.id) ?? [];
  const profileName = profile?.name ?? "User";

  if (isOwner) {
    return (
      <ReadingListPageContent
        userId={userId}
        isOwner
        profileName={profileName}
        favoriteBookIds={favoriteBookIds}
      />
    );
  }

  const readingList = await getUserReadingList(userId);

  return (
    <ReadingListPageContent
      userId={userId}
      isOwner={false}
      profileName={profileName}
      favoriteBookIds={favoriteBookIds}
      initialData={readingList}
    />
  );
}
