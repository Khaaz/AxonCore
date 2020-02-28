import * as Types from './types';
declare namespace AxonCore {
    export import JsonManager = Types.JsonManager;
    export import AxonSchema = Types.AxonSchema;
    export import GuildSchema = Types.GuildSchema;
    export import ADBProvider = Types.ADBProvider;
    export import DBSelector = Types.DBSelector;
    export import InMemoryProvider = Types.InMemoryProvider;
    export import JsonProvider = Types.JsonProvider;
    export import MongoProvider = Types.MongoProvider;
    export import AxonCommandError = Types.AxonCommandError;
    export import AxonError = Types.AxonError;
    export import NoAbstractInstanceException = Types.NoAbstractInstanceException;
    export import NotImplementedException = Types.NotImplementedException;
    export import MessageManager = Types.MessageManager;
    export import MessageParser = Types.MessageParser;
    export import TranslationManager = Types.TranslationManager;
    export import Channel = Types.Channel;
    export import Client = Types.Client;
    export import Enums = Types.Enums;
    export import EVENTS = Types.EVENTS;
    export import DISCORD_LIB_PERMISSIONS = Types.DISCORD_LIB_PERMISSIONS;
    export import PERMISSIONS = Types.PERMISSIONS;
    export import PERMISSIONS_NAMES = Types.PERMISSIONS_NAMES;
    export import Guild = Types.Guild;
    export import LibraryInterface = Types.LibraryInterface;
    export import Member = Types.Member;
    export import Message = Types.Message;
    export import Resolver = Types.Resolver;
    export import User = Types.User;
    export import LibMessage = Types.LibMessage;
    export import LibMember = Types.LibMember;
    export import LibClient = Types.LibClient;
    export import LibGuild = Types.LibGuild;
    export import LibUser = Types.LibUser;
    export import LibTextableChannel = Types.LibTextableChannel;
    export import LibRole = Types.LibRole;
    export import LibChannel = Types.LibChannel;
    export import LibDMChannel = Types.LibDMChannel;
    export import LibPermission = Types.LibPermission;
    export import LibrarySelector = Types.LibrarySelector;
    export import ALogger = Types.ALogger;
    export import ChalkLogger = Types.ChalkLogger;
    export import Context = Types.Context;
    export import DefLogger = Types.DefLogger;
    export import LoggerSelector = Types.LoggerSelector;
    export import SignaleLogger = Types.SignaleLogger;
    export import WinstonLogger = Types.WinstonLogger;
    export import ModuleInfo = Types.ModuleInfo;
    export import ModuleData = Types.ModuleData;
    export import AxonJSON = Types.AxonJSON;
    export import GuildJSON = Types.GuildJSON;
    export import AConfig = Types.AConfig;
    export import AxonConfigRaw = Types.AxonConfigRaw;
    export import GConfig = Types.GConfig;
    export import GuildConfigRaw = Types.GuildConfigRaw;
    export import CommandInfo = Types.CommandInfo;
    export import ACommandOptions = Types.ACommandOptions;
    export import CommandPerms = Types.CommandPerms;
    export import CommandData = Types.CommandData;
    export import AxonTemplate = Types.AxonTemplate;
    export import ListenerInfo = Types.ListenerInfo;
    export import ListenerData = Types.ListenerData;
    export import APIAxonMSGCont = Types.APIAxonMSGCont;
    export import AxonMSGCont = Types.AxonMSGCont;
    export import AxonMSGOpt = Types.AxonMSGOpt;
    export import PermissionObject = Types.PermissionObject;
    export import Ctx = Types.Ctx;
    export import EmbedFields = Types.EmbedFields;
    export import EmbedAuthor = Types.EmbedAuthor;
    export import EmbedThumbnail = Types.EmbedThumbnail;
    export import EmbedImage = Types.EmbedImage;
    export import EmbedFooter = Types.EmbedFooter;
    export import EmbedData = Types.EmbedData;
    export import PromptOptions = Types.PromptOptions;
    export import PromptOptionsData = Types.PromptOptionsData;
    export import CollectorOptions = Types.CollectorOptions;
    export import AxonOptionsSettings = Types.AxonOptionsSettings;
    export import AOptionsSettings = Types.AOptionsSettings;
    export import AxonLanguageResponse = Types.AxonLanguageResponse;
    export import Languages = Types.Languages;
    export import AxonOptionsBase = Types.AxonOptionsBase;
    export import WebhookConfig = Types.WebhookConfig;
    export import Webhooks = Types.Webhooks;
    export import AxonOptionsPrefixes = Types.AxonOptionsPrefixes;
    export import AxonOptionsInfo = Types.AxonOptionsInfo;
    export import AxonOptionsStaff = Types.AxonOptionsStaff;
    export import AxonOptionsExtensions = Types.AxonOptionsExtensions;
    export import AxonConfs = Types.AxonConfs;
    export import AxonParams = Types.AxonParams;
    export import Info = Types.Info;
    export import AxonInfo = Types.AxonInfo;
    export import AxonStaffIDs = Types.AxonStaffIDs;
    export import LibraryInterfaceStructs = Types.LibraryInterfaceStructs;
    export import PresenceGame = Types.PresenceGame;
    export import RawAttachment = Types.RawAttachment;
    export import RawUser = Types.RawUser;
    export import WebhookResponse = Types.WebhookResponse;
    export import DjsContent = Types.DjsContent;
    export import DjsWebhookContent = Types.DjsWebhookContent;
    export import DjsPresenceGame = Types.DjsPresenceGame;
    export import ErisContent = Types.ErisContent;
    export import ErisWebhookContent = Types.ErisWebhookContent;
    export import ErisPresenceGame = Types.ErisPresenceGame;
    export import Command = Types.Command;
    export import CommandContext = Types.CommandContext;
    export import CommandCooldown = Types.CommandCooldown;
    export import CommandOptions = Types.CommandOptions;
    export import CommandPermissions = Types.CommandPermissions;
    export import CommandResponse = Types.CommandResponse;
    export import AxonConfig = Types.AxonConfig;
    export import GuildConfig = Types.GuildConfig;
    export import AHandler = Types.AHandler;
    export import EventManager = Types.EventManager;
    export import Listener = Types.Listener;
    export import ALoader = Types.ALoader;
    export import ClientInitialiser = Types.ClientInitialiser;
    export import CommandLoader = Types.CommandLoader;
    export import ListenerLoader = Types.ListenerLoader;
    export import ModuleLoader = Types.ModuleLoader;
    export import ARegistry = Types.ARegistry;
    export import CommandRegistry = Types.CommandRegistry;
    export import GuildConfigCache = Types.GuildConfigCache;
    export import ListenerRegistry = Types.ListenerRegistry;
    export import ModuleRegistry = Types.ModuleRegistry;
    export import ASelector = Types.ASelector;
    export import Base = Types.Base;
    export import CommandDispatcher = Types.CommandDispatcher;
    export import Module = Types.Module;
    export import Validator = Types.Validator;
    export import AxonEnums = Types.AxonEnums;
    export import HTTP_CODE = Types.HTTP_CODE;
    export import HTTP_MESSAGES = Types.HTTP_MESSAGES;
    export import LIBRARY_TYPES = Types.LIBRARY_TYPES;
    export import LOGGER_TYPES = Types.LOGGER_TYPES;
    export import LOG_LEVELS = Types.LOG_LEVELS;
    export import DB_TYPES = Types.DB_TYPES;
    export import COMMAND_EXECUTION_TYPES = Types.COMMAND_EXECUTION_TYPES;
    export import COMMAND_EXECUTION_STATE = Types.COMMAND_EXECUTION_STATE;
    export import AXON_PERMISSION_LEVELS = Types.AXON_PERMISSION_LEVELS;
    export import PERMISSION_ADMIN = Types.PERMISSION_ADMIN;
    export import PERMISSION_MANAGER = Types.PERMISSION_MANAGER;
    export import DiscordEnums = Types.DiscordEnums;
    export import Embed = Types.Embed;
    export import MessageCollector = Types.MessageCollector;
    export import Prompt = Types.Prompt;
    export import ReactionCollector = Types.ReactionCollector;
    export import AsyncQueue = Types.AsyncQueue;
    export import AutoQueue = Types.AutoQueue;
    export import FunctionQueue = Types.FunctionQueue;
    export import LRUCache = Types.LRUCache;
    export import Queue = Types.Queue;
    export import Stack = Types.Stack;
    export import AxonUtils = Types.AxonUtils;
    export import Collection = Types.Collection;
    export import Utils = Types.Utils;
    export import AxonClient = Types.AxonClient;
    export import AxonOptions = Types.AxonOptions;
    export import updateDBVal = Types.updateDBVal;
}

export = AxonCore;
