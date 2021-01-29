import prisma from '../src/lib/prisma'

const seed = async (): Promise<void> => {
    await prisma.user.upsert({
        where: { id: 'testuser01' },
        update: {},
        create: {
            id: 'testuser01',
            name: 'testuser01',
            profile: 'testtest',
            avatarUrl: '',
            tweetList: {
                create: {
                    content: 'ほげほげ',
                },
            },
        },
        select: { id: true, name: true, profile: true },
    })
    await prisma.user.upsert({
        where: { id: 'testuser02' },
        update: {},
        create: {
            id: 'testuser02',
            name: 'testuser02',
            profile: 'testtesttest',
            avatarUrl: '',
            tweetList: {
                create: {
                    content: 'ふがふが',
                },
            },
        },
        select: { id: true, name: true, profile: true },
    })
    await prisma.user.upsert({
        where: { id: 'testuser03' },
        update: {},
        create: {
            id: 'testuser03',
            name: 'testuser03',
            profile: 'testtesttest',
            avatarUrl: '',
            tweetList: {
                create: {
                    content: 'ぴよぴよ',
                },
            },
        },
        select: { id: true, name: true, profile: true },
    })
}

seed()
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect
    })
