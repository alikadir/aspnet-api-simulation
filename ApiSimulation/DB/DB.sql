USE [master]
GO
/****** Object:  Database [ApiSimulation]    Script Date: 4/15/2016 11:40:44 AM ******/
CREATE DATABASE [ApiSimulation]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ApiSimulation', FILENAME = N'E:\DATA\ApiSimulation.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'ApiSimulation_log', FILENAME = N'F:\LOG\ApiSimulation_log.ldf' , SIZE = 1536KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ApiSimulation] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ApiSimulation].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ApiSimulation] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ApiSimulation] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ApiSimulation] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ApiSimulation] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ApiSimulation] SET ARITHABORT OFF 
GO
ALTER DATABASE [ApiSimulation] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ApiSimulation] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ApiSimulation] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ApiSimulation] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ApiSimulation] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ApiSimulation] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ApiSimulation] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ApiSimulation] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ApiSimulation] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ApiSimulation] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ApiSimulation] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ApiSimulation] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ApiSimulation] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ApiSimulation] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ApiSimulation] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ApiSimulation] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ApiSimulation] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ApiSimulation] SET RECOVERY FULL 
GO
ALTER DATABASE [ApiSimulation] SET  MULTI_USER 
GO
ALTER DATABASE [ApiSimulation] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ApiSimulation] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ApiSimulation] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ApiSimulation] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [ApiSimulation] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ApiSimulation', N'ON'
GO
USE [ApiSimulation]
GO
/****** Object:  Table [dbo].[tRequestLog]    Script Date: 4/15/2016 11:40:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tRequestLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ResponseID] [int] NOT NULL,
	[RequestDate] [datetime] NOT NULL,
	[RequestUserAgent] [nvarchar](500) NOT NULL,
	[RequestIP] [nvarchar](15) NOT NULL,
	[RequestMethod] [nvarchar](50) NOT NULL,
	[RequestRaw] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_tRequestLog] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tResponse]    Script Date: 4/15/2016 11:40:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tResponse](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Url] [nvarchar](150) NOT NULL,
	[Category] [nvarchar](50) NOT NULL,
	[CreateDate] [datetime] NOT NULL CONSTRAINT [DF_tResponse_CreateDate]  DEFAULT (getdate()),
	[Hit] [smallint] NOT NULL CONSTRAINT [DF_tResponse_Hit]  DEFAULT ((0)),
	[LastRequestDate] [datetime] NOT NULL CONSTRAINT [DF_tResponse_LastRequestDate]  DEFAULT (getdate()),
	[IsDelete] [bit] NOT NULL CONSTRAINT [DF_tResponse_IsDelete]  DEFAULT ((0)),
 CONSTRAINT [PK_tResponse] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[tResponseDetail]    Script Date: 4/15/2016 11:40:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tResponseDetail](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ResponseID] [int] NOT NULL,
	[ContentType] [nvarchar](100) NOT NULL,
	[ContentRaw] [nvarchar](max) NOT NULL,
	[CreateDate] [datetime] NOT NULL CONSTRAINT [DF_tResponseDetail_CreateDate]  DEFAULT (getdate()),
	[Delay] [int] NOT NULL CONSTRAINT [DF_tResponseDetail_Delay]  DEFAULT ((0)),
	[Hit] [smallint] NOT NULL CONSTRAINT [DF_tResponseDetail_Hit]  DEFAULT ((0)),
	[IsDelete] [bit] NOT NULL CONSTRAINT [DF_tResponseDetail_IsDelete]  DEFAULT ((0)),
 CONSTRAINT [PK_tResponseDetail] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[tResponse] ON 

GO
INSERT [dbo].[tResponse] ([ID], [Url], [Category], [CreateDate], [Hit], [LastRequestDate], [IsDelete]) VALUES (6, N'sport/live-score?date=28.05.2016', N'Sport', CAST(N'2016-04-07 18:49:02.183' AS DateTime), 5, CAST(N'2016-04-15 11:40:41.733' AS DateTime), 0)
GO
INSERT [dbo].[tResponse] ([ID], [Url], [Category], [CreateDate], [Hit], [LastRequestDate], [IsDelete]) VALUES (7, N'sport/live-score?date=29.05.2016', N'Sport', CAST(N'2016-04-07 18:53:13.080' AS DateTime), 0, CAST(N'2016-04-07 18:57:39.170' AS DateTime), 0)
GO
INSERT [dbo].[tResponse] ([ID], [Url], [Category], [CreateDate], [Hit], [LastRequestDate], [IsDelete]) VALUES (8, N'sport/live-score?date=30.05.2016', N'Sport', CAST(N'2016-04-07 15:54:07.410' AS DateTime), 0, CAST(N'2016-04-13 13:39:53.670' AS DateTime), 0)
GO
INSERT [dbo].[tResponse] ([ID], [Url], [Category], [CreateDate], [Hit], [LastRequestDate], [IsDelete]) VALUES (11, N'deneme', N'Deneme Kategori', CAST(N'2016-04-12 08:55:33.613' AS DateTime), 0, CAST(N'2016-04-15 10:30:32.767' AS DateTime), 0)
GO
INSERT [dbo].[tResponse] ([ID], [Url], [Category], [CreateDate], [Hit], [LastRequestDate], [IsDelete]) VALUES (13, N'log-push', N'Log', CAST(N'2016-04-12 16:48:36.043' AS DateTime), 0, CAST(N'2016-04-15 11:36:20.513' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[tResponse] OFF
GO
SET IDENTITY_INSERT [dbo].[tResponseDetail] ON 

GO
INSERT [dbo].[tResponseDetail] ([ID], [ResponseID], [ContentType], [ContentRaw], [CreateDate], [Delay], [Hit], [IsDelete]) VALUES (17, 6, N'application/json', N'[
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
},
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
},
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
}
]', CAST(N'2016-04-07 18:49:52.297' AS DateTime), 0, 5, 0)
GO
INSERT [dbo].[tResponseDetail] ([ID], [ResponseID], [ContentType], [ContentRaw], [CreateDate], [Delay], [Hit], [IsDelete]) VALUES (18, 7, N'application/json', N'[
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
},
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
},
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
}
]', CAST(N'2016-04-07 18:54:15.690' AS DateTime), 0, 0, 0)
GO
INSERT [dbo].[tResponseDetail] ([ID], [ResponseID], [ContentType], [ContentRaw], [CreateDate], [Delay], [Hit], [IsDelete]) VALUES (20, 8, N'application/json', N'[
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
},
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
},
{
"FutureMatches":[
{
"TimeOfMatch":"21:45",
"Id":8,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":9,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TimeOfMatch":"21:45",
"Id":10,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"LiveMatches":[
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":15,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":16,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"CompletedPercent":60,
"LiveScoreStatusName":"IY",
"Minutes":35,
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":17,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
],
"Name":"Spor Toto Süper Lig",
"PassedMatches":[
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":0,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":1,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
},
{
"TeamOneScore":"4",
"TeamTwoScore":"1",
"Id":2,
"TeamOne":"Adıyaman Spor",
"TeamOneImage":"https://upload.wikimedia.org/wikipedia/tr/8/8c/Adiyamanspor.png",
"TeamTwo":"Fenerbahçe",
"TeamTwoImage":"https://upload.wikimedia.org/wikipedia/tr/8/85/200px-Fenerbah%C3%A7e.png"
}
]
}
]', CAST(N'2016-04-07 18:54:30.860' AS DateTime), 0, 0, 0)
GO
INSERT [dbo].[tResponseDetail] ([ID], [ResponseID], [ContentType], [ContentRaw], [CreateDate], [Delay], [Hit], [IsDelete]) VALUES (1023, 11, N'application/json', N'@{
Model.Response.StatusCode = 403;
}', CAST(N'2016-04-11 08:55:37.000' AS DateTime), 0, 0, 0)
GO
INSERT [dbo].[tResponseDetail] ([ID], [ResponseID], [ContentType], [ContentRaw], [CreateDate], [Delay], [Hit], [IsDelete]) VALUES (1024, 13, N'application/json', N'@Model.Request.Form', CAST(N'2016-04-13 08:01:42.277' AS DateTime), 0, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[tResponseDetail] OFF
GO
ALTER TABLE [dbo].[tRequestLog]  WITH CHECK ADD  CONSTRAINT [FK_tRequestLog_tResponse] FOREIGN KEY([ResponseID])
REFERENCES [dbo].[tResponse] ([ID])
GO
ALTER TABLE [dbo].[tRequestLog] CHECK CONSTRAINT [FK_tRequestLog_tResponse]
GO
ALTER TABLE [dbo].[tResponseDetail]  WITH CHECK ADD  CONSTRAINT [FK_tResponseDetail_tResponse] FOREIGN KEY([ResponseID])
REFERENCES [dbo].[tResponse] ([ID])
GO
ALTER TABLE [dbo].[tResponseDetail] CHECK CONSTRAINT [FK_tResponseDetail_tResponse]
GO
USE [master]
GO
ALTER DATABASE [ApiSimulation] SET  READ_WRITE 
GO
